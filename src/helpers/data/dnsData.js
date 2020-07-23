const checkDns = (ip, instanceObj, hostname) => new Promise((resolve, reject) => {
  const dnsState = {
    Name: null,
    Ip: null,
    Propagated: false,
  };
  if (ip) {
    dnsState.Name = hostname;
    dnsState.Ip = ip;

    fetch(`https://dns.google/resolve?name=${hostname}`)
      .then((res) => res.json())
      .then((json) => {
        if ('Answer' in json && json.Answer[0].data === instanceObj.PublicIpAddress) {
          dnsState.Propagated = true
        }
      })
      .catch((err) => reject(err));
  }
  resolve(dnsState);
});

export default {
  checkDns,
};
