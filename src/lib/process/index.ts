import os, { CpuInfo, NetworkInterfaceInfo } from 'os';

interface cpu {
  cpus: CpuInfo[];
  loadavg: number[];
}

interface mem {
  total: number;
  free: number;
}

export class Health {
  status: string;
  uptime: number;
  hostname: string;
  nics: { [index: string]: NetworkInterfaceInfo[] };
  cpu: cpu;
  mem: mem;

  constructor(props: Health) {
    this.status = props.status;
    this.uptime = props.uptime;
    this.hostname = props.hostname;
    this.nics = props.nics;
    this.cpu = props.cpu;
    this.mem = props.mem;
  }

  static Calc() {
    return new Health({
      status: 'UP',
      uptime: process.uptime(),
      hostname: os.hostname(),
      nics: os.networkInterfaces(),
      cpu: {
        cpus: os.cpus(),
        loadavg: os.loadavg(),
      },
      mem: {
        total: os.totalmem(),
        free: os.freemem(),
      },
    });
  }
}
