with open('./candump.log') as can_log:
  log_entries = can_log.readlines()

unique_can_id = {}
for entry in log_entries:
  log_parts = entry.strip().split(' ')
  CanID = log_parts[2][:3]
  if CanID not in unique_can_id:
    unique_can_id[CanID] = []
  unique_can_id[CanID].append(entry.strip())

for unique_id in unique_can_id:
  print(f"{unique_id}: {len(unique_can_id[unique_id])}")
