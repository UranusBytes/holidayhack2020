#!/usr/bin/env python3

import logging
from base64 import b64decode

from Crypto.Hash import MD5
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5

from blockchain.naughty_nice import Chain
from mt19937_hack import mt19937

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
class NewChain(Chain):
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


def guess_nonces(chain):
  chain_prng = mt19937(0)
  start_block = 1
  for i in range(0, mt19937.n, 1):
    block_index = i + start_block  # int((i/2) + start_block)
    block_nonce = chain.get_block(block_index).nonce
    nonce_bytes = (block_nonce).to_bytes(8, byteorder='big')
    print(f"{nonce_bytes.hex()}  - A: {nonce_bytes[:4].hex()}    B:{nonce_bytes[-4:].hex()}")
    seed_a = int.from_bytes(nonce_bytes[:4], byteorder='big')
    # seed_b = int.from_bytes(nonce_bytes[-4:], byteorder='big')
    chain_prng.MT[i] = untemper(seed_a)
    print(f"Block {block_index} - {block_nonce}  - {seed_a}({nonce_bytes[:4].hex()}) Seeded to {i}")
    # chain_prng.MT[i+1] = untemper(seed_b)
    #print(f"Block {block_index} - {block_nonce}  - {seed_b}({nonce_bytes[-4:].hex()}) Seeded to {i+1}")

    # nonce_a_bytes = (seed_a).to_bytes(4, byteorder='big')
    # nonce_b_bytes = (seed_b).to_bytes(4, byteorder='big')
    # validate_nonce_bytes = nonce_a_bytes + nonce_b_bytes
    # next_nonce = int.from_bytes(validate_nonce_bytes, byteorder='big')
    # print(f"Validate: {validate_nonce_bytes.hex()}  - {next_nonce}\n\n")

  # Start guessing
  print('\n\n******************************************************************************\n\n')
  for i in range(mt19937.n, mt19937.n+6, 2):
    block_index = int((i / 2) + start_block)
    block_nonce = chain.get_block(block_index).nonce
    nonce_bytes = (block_nonce).to_bytes(8, byteorder='big')
    print(f"Next Block: {nonce_bytes.hex()}  - A: {nonce_bytes[:4].hex()}    ")  # B:{nonce_bytes[-4:].hex()}
    seed_a = int.from_bytes(nonce_bytes[:4], byteorder='big')
    # seed_b = int.from_bytes(nonce_bytes[-4:], byteorder='big')
    print(f"Block {block_index} - {block_nonce}  - {seed_a}({nonce_bytes[:4].hex()}) Actual for {i}")
    # print(f"Block {block_index} - {block_nonce}  - {seed_b}({nonce_bytes[-4:].hex()}) Actual to {i + 1}")

    guess_nonce_a = chain_prng.extract_number()
    # guess_nonce_b = chain_prng.extract_number()


    guess_nonce_a_bytes = (guess_nonce_a).to_bytes(4, byteorder='big')
    # guess_nonce_b_bytes = (guess_nonce_b).to_bytes(4, byteorder='big')
    # guess_nonce_bytes = guess_nonce_a_bytes + guess_nonce_b_bytes
    # print(f"Guess: {guess_nonce_bytes.hex()}  - A: {guess_nonce_a_bytes.hex()}    B:{guess_nonce_b_bytes.hex()}")
    print(f"Guess: A: {guess_nonce_a_bytes.hex()}")
    #
    # block_nonce = chain.get_block(block_index).nonce
    # nonce_bytes = (block_nonce).to_bytes(8, byteorder='big')
    # print(f"Actual: {nonce_bytes.hex()}  - A: {nonce_bytes[:4].hex()}    B:{nonce_bytes[-4:].hex()}\n")
    #
    # guess_nonce = int.from_bytes(guess_nonce_bytes, byteorder='big')
    #
    # block_nonce = chain.get_block(block_index).nonce
    # print("Block %i - %10.10i   Guess: %10.10i (%r)" % (block_index, block_nonce, guess_nonce, (guess_nonce == block_nonce)))


# Seed of 0
# Block 623 - 13482752504286027226 Seeded
# Block 624 - 14229353351227460080 Seeded
# Block 625 - 13962714500031649263   Guess: 17445039956195676094 (False)
# Block 626 - 10512000677293339590   Guess: 12279127169542585159 (False)

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

  guess_nonces(nnl)

  return  # End of main


if __name__ == "__main__":
  logger = get_logger()
  main()
