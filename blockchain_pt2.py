#!/usr/bin/env python3

import logging
from base64 import b64decode

from Crypto.Hash import MD5, SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5

from blockchain.blockchain_mt19937 import mt19937
from blockchain.naughty_nice import Chain, Block

###############################################################################
# Constants
###############################################################################
blockchain_file_path = './blockchain/blockchain.dat'
publickey_file_path = './blockchain/official_public.pem'
nonce_file_path = './blockchain/nonce.txt'

# genesis_block_fake_hash = '00000000000000000000000000000000'  # Original genesis hash
genesis_block_fake_hash = 'c6e2e6ecb785e7132c8003ab5aaba88d'  # Hash from first block

data_types = {1: 'plaintext', 2: 'jpeg image', 3: 'bmp image', 4: 'gif image', 5: 'PDF', 6: 'Word', 7: 'PowerPoint', 8: 'Excel', 9: 'tiff image', 10: 'MP4 video', 11: 'MOV video', 12: 'WMV video', 13: 'FLV video', 14: 'AVI video',
              255: 'Binary blob'}
data_extension = {1: 'txt', 2: 'jpg', 3: 'bmp', 4: 'gif', 5: 'pdf', 6: 'docx', 7: 'pptx', 8: 'xlsx', 9: 'tiff', 10: 'mp4', 11: 'mov', 12: 'wmv', 13: 'flv', 14: 'avi', 255: 'bin'}

Naughty = 0
Nice = 1


###############################################################################
# Classes
###############################################################################
class NewBlock(Block):
  def full_hash_sha256(self):
    hash_obj = SHA256.new()
    hash_obj.update(self.block_data_signed())
    return hash_obj.hexdigest()


class NewChain(Chain):


  ###############################################################################
  # New Methods
  #

  def count(self):
    return len(self.blocks)

  def get_block(self, index):
    return self.blocks[index]

  def new_verify_chain(self, publickey, previous_hash=None):
    flag = True

    # unless we're explicitly told what the initial last hash should be, we assume that
    # the initial block will be the genesis block and will have a fixed previous_hash
    if previous_hash is None:
      previous_hash = genesis_block_fake_hash
    for i in range(0, len(self.blocks)):  # assume Genesis block integrity
      block_no = self.blocks[i].index
      if not self.blocks[i].verify_types():
        flag = False
        print(f'\n*** WARNING *** Wrong data type(s) at block({i}) {block_no}.')
      if self.blocks[i].index != i + self.initial_index:
        flag = False
        print(f'\n*** WARNING *** Wrong block index at what should be block({i}) {i + self.initial_index}: {block_no}.')
      if self.blocks[i].previous_hash != previous_hash:
        flag = False
        print(f'\n*** WARNING *** Wrong previous hash at block({i}) {block_no}.')
      hash_obj = MD5.new()
      hash_obj.update(self.blocks[i].block_data())
      signer = PKCS1_v1_5.new(publickey)
      if signer.verify(hash_obj, b64decode(self.blocks[i].sig)) is False:
        flag = False
        print(f'\n*** WARNING *** Bad signature at block({i}) {block_no}.')
      if flag == False:
        print(f'\n*** WARNING *** Blockchain invalid from block({i}) {block_no} onward.\n')
        return False
      previous_hash = self.blocks[i].full_hash()
    return True

  def dump_nonces(self, fp, publickey, previous_hash=None):
    if previous_hash is None:
      previous_hash = genesis_block_fake_hash
    for i in range(0, len(self.blocks)):  # assume Genesis block integrity
      fp.write(f"{i},{self.blocks[i].index},{str(self.blocks[i].nonce)}\n")
    return

  def get_genesis_hash(self):
    return self.blocks[0].previous_hash

  def full_hash(self):
    hash_obj = MD5.new()
    hash_obj.update(self.block_data_signed())
    return hash_obj.hexdigest()


###############################################################################
# Functions
###############################################################################
def get_logger():
  logging.basicConfig(level=logging.INFO,
                      format="%(asctime)s %(levelname)s %(message)s")
  new_logger = logging.getLogger()
  return new_logger


def untemper(y):
  y ^= y >> mt19937.l
  y ^= y << mt19937.t & mt19937.c
  for i in range(7):
    y ^= y << mt19937.s & mt19937.b
  for i in range(3):
    y ^= y >> mt19937.u & mt19937.d
    return y


def print_block_len(block):
    s = (str('%016.016x' % (block.index)).encode('utf-8'))
    s += (str('%016.016x' % (block.nonce)).encode('utf-8'))
    s += (str('%016.016x' % (block.pid)).encode('utf-8'))
    s += (str('%016.016x' % (block.rid)).encode('utf-8'))
    # print(f'Doc_count: {len(s)}')  # Cur len: 64
    s += (str('%1.1i' % (block.doc_count)).encode('utf-8'))
    s += (str(('%08.08x' % (block.score))).encode('utf-8'))
    print(f'Sign: {len(s)}')  # Cur len: 84
    s += (str('%1.1i' % (block.sign)).encode('utf-8'))
    for d in block.data:
        s += (str('%02.02x' % d['type']).encode('utf-8'))
        s += (str('%08.08x' % d['length']).encode('utf-8'))
        print(f'Data: {len(s)}')  # Cur len: 84
        s += d['data']
    s += (str('%02.02i' % (block.month)).encode('utf-8'))
    s += (str('%02.02i' % (block.day)).encode('utf-8'))
    s += (str('%02.02i' % (block.hour)).encode('utf-8'))
    s += (str('%02.02i' % (block.minute)).encode('utf-8'))
    s += (str('%02.02i' % (block.second)).encode('utf-8'))
    s += (str(block.previous_hash).encode('utf-8'))
    print(f'\n\n')  #  Cur len: 40993
    return(s)

###############################################################################
# Main
###############################################################################
def main():
  logger.info('Load public key')
  with open(publickey_file_path, 'rb') as key_file:
    public_key = RSA.importKey(key_file.read())

  logger.info('Load chain')
  nnl = NewChain(load=True, filename=blockchain_file_path)

  # Validated already
  # logger.info('Validate chain')
  # valid = nnl.new_verify_chain(public_key)

  # Dumped already
  # with open(nonce_file_path, 'w') as nonce_file:
  #   nnl.dump_nonces(nonce_file, public_key)

  # print(f"Genesis hash: {nnl.get_genesis_hash()}")

  for i in range(nnl.count()):
    block = nnl.get_block(i)

    hash_obj = SHA256.new()
    hash_obj.update(block.block_data_signed())
    block_sha256 = hash_obj.hexdigest()

    if block_sha256 == "58a3b9335a6ceb0234c12d35a0564c4ef0e90152d0eb2ce2082383b38028a90f":
      print(f'Found Jacks Block - i: {i}  index: {block.index}   score: {block.score}')
      print(block)

      # Find bit to change

      hash_obj = MD5.new()
      hash_obj.update(block.block_data_signed())
      block_md5 = hash_obj.hexdigest()
      print(f"Old hash: {block_md5}\n\n")

      # block.data.pop(0)  # Delete the padding file
      print_block_len(block)

      temp_data = bytearray(block.block_data_signed())
      print("Pre-Naughty: 0x{:02x}, {}".format(temp_data[73], temp_data[73]))
      print("Balance-1: 0x{:02x}, {}".format(temp_data[137], temp_data[137]))
      print("Pre-PDF: 0x{:02x}, {}".format(temp_data[265], temp_data[265]))
      print("Balance-2: 0x{:02x}, {}".format(temp_data[329], temp_data[329]))  # Change doc object


      print("\nChange values\n***************************\n")
      block.sign = Naughty
      # Balance Naught
      temp_data = bytearray(block.data[0]['data'])
      temp_data[53] = temp_data[53] + 1
      block.data[0]['data'] = bytes(temp_data)

      # Change PDF
      temp_data = bytearray(block.data[1]['data'])
      temp_data[63] = temp_data[63] + 1
      temp_data[127] = temp_data[127] - 1
      block.data[1]['data'] = bytes(temp_data)

      #
      temp_data = bytearray(block.block_data_signed())
      # print("Post-Doc_Count: 0x{:02x}, {}".format(temp_data[64], temp_data[64]))
      print("Post-Naughty: 0x{:02x}, {}".format(temp_data[73], temp_data[73]))
      print("Balance-1: 0x{:02x}, {}".format(temp_data[137], temp_data[137]))
      print("Post-PDF: 0x{:02x}, {}".format(temp_data[265], temp_data[265]))
      print("Post-PDF: 0x{:02x}, {}".format(temp_data[329], temp_data[329]))  # Change doc object

      hash_obj = MD5.new()
      hash_obj.update(block.block_data_signed())
      block_md5 = hash_obj.hexdigest()
      print(f"\n\nNew hash: {block_md5}")

      hash_obj = SHA256.new()
      hash_obj.update(block.block_data_signed())
      print(f"\n\nNew SHA256 hash: {hash_obj.hexdigest()}")



  return  # End of main


if __name__ == "__main__":
  logger = get_logger()
  main()
