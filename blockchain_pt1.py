#!/usr/bin/env python3

import logging
from base64 import b64decode

from Crypto.Hash import MD5
from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5

from blockchain.naughty_nice import Chain
from blockchain.blockchain_mt19937 import mt19937
from mt19937predictor import MT19937Predictor

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
  predictor = MT19937Predictor()
  for i in range(624):
    block_nonce = chain.get_block(i).nonce
    predictor.setrandbits(block_nonce, 64)


  for i in range(624, chain.count()):
    block_nonce = chain.get_block(i).nonce
    next_guess = predictor.getrandbits(64)
    if block_nonce == next_guess:
      # print(f"Block #{i} of Index {chain.get_block(i).index} the same...")
      pass
    else:
      print(f"Block {i} of {block_nonce} different from guess of {next_guess}.")
      exit(1)
  last_index = chain.get_block(chain.count()-1).index
  for i in range(1,10):
    next_guess = predictor.getrandbits(64)
    print(f"Block #{i+chain.count()} of Index {last_index+i}  guess of {next_guess}  ({hex(next_guess)}).")

# Block #1549 of Index 129997  guess of 13205885317093879758  (0xb744baba65ed6fce).
# Block #1550 of Index 129998  guess of 109892600914328301  (0x1866abd00f13aed).
# Block #1551 of Index 129999  guess of 9533956617156166628  (0x844f6b07bd9403e4).
# Block #1552 of Index 130000  guess of 6270808489970332317  (0x57066318f32f729d).
# Block #1553 of Index 130001  guess of 3451226212373906987  (0x2fe537f46c10462b).
# Block #1554 of Index 130002  guess of 13075056776572822761  (0xb573eedd19afe4e9).
# Block #1555 of Index 130003  guess of 14778594218656921905  (0xcd181d243aaff931).
# Block #1556 of Index 130004  guess of 6725523028518543315  (0x5d55db8fa38e9fd3).
# Block #1557 of Index 130005  guess of 8533705287792980227  (0x766dcfbee8c5f103).


def guess_nonces2(chain):
  blockchain_prng = mt19937(0)
  for i in range(int(mt19937.n/2)):
    print(f"i {i}")
    block = chain.get_block(i)
    seed_64bit = hex(block.nonce)
    seed_32bit_b = seed_64bit[2:10]
    seed_32bit_a = seed_64bit[-8:]

    seed_32bit_a_int = int(f"0x{seed_32bit_a}", 0)
    seed_32bit_b_int = int(f"0x{seed_32bit_b}", 0)

    print(f"seed {i*2}")
    blockchain_prng.MT[i*2] = untemper(seed_32bit_a_int)
    print(f"seed {(i*2)+1}")
    blockchain_prng.MT[(i*2)+1] = untemper(seed_32bit_b_int)
  # generator should be seeded now...
  print('Start validate moving forward through prng')
  for i in range(int(mt19937.n/2), chain.count()):
    print(f"i {i}")
    block = chain.get_block(i)
    seed_64bit = hex(block.nonce)
    seed_32bit_b = seed_64bit[2:10]
    seed_32bit_a = seed_64bit[-8:]
    seed_32bit_a_int = int(f"0x{seed_32bit_a}", 0)
    seed_32bit_b_int = int(f"0x{seed_32bit_b}", 0)

    next_guess_pt2 = hex(blockchain_prng.extract_number())
    next_guess_pt1 = hex(blockchain_prng.extract_number())
    next_guess_str = f"0x{next_guess_pt1[2:10]}{next_guess_pt2[2:10]}"

    next_guess = int(next_guess_str, 0)

    if seed_64bit == next_guess:
      # print(f"Block #{i} of Index {chain.get_block(i).index} the same...")
      pass
    else:
      print(f"Block {i}")
      print(f"Nonce {block_nonce}")
      print(f"Guess {next_guess}")
      exit(1)
    print('It worked!')

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

  print("Guess Logic #1")
  guess_nonces(nnl)
  # print("\n\n**********************************************************************\n")
  # print("Guess Logic #2\n\n")
  # guess_nonces2(nnl)


  return  # End of main


if __name__ == "__main__":
  logger = get_logger()
  main()
