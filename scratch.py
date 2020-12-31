# Block #1552 of Index 130000  guess of 6270808489970332317  (0x57066318f32f729d).


seed = 6270808489970332317
seed_str = hex(seed)
seed_a = seed_str[2:10]
seed_b = seed_str[-8:]

seed_a_int = int(f"0x{seed_a}", 0)
seed_b_int = int(f"0x{seed_b}", 0)

seed_a_int_str = hex(seed_a_int)
seed_b_int_str = hex(seed_b_int)

seed_int = int(f"0x{seed_a_int_str[2:10]}{seed_b_int_str[2:10]}", 0)


print('debug')


