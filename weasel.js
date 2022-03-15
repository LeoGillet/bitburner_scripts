/* NetScript JS */

/** @param {NS} ns **/
export async function main(ns) {
	var hostname = ns.getHostname();
	ns.print("Scanning server " + hostname);
	var servers = ns.scan(hostname);
	for (var i = 0; i < servers.length; i++) {
		var servername = servers[i];
		if (ns.serverExists(servername)) {
			var min_ports = ns.getServerNumPortsRequired(servername);
			if (!ns.hasRootAccess(servername) && min_ports <= 2) {
				ns.print("Server " + servername + " found has not root access");

				ns.print("Server " + servername + " has a minimum port security of " + min_ports);
				if (min_ports >= 1) {
					ns.print('Running BruteSSH on server ' + servername);
					ns.brutessh(servername);
					if (min_ports == 2) {
						ns.print('Running FTPCrack on server ' + servername);
						ns.ftpcrack(servername);
					}
				}
				ns.print('Nuking server ' + servername);
				ns.nuke(servername);
				if (ns.hasRootAccess(servername)) { 'GAINED ROOT ACCESS ON SERVER' + servername };
			}
			else if (min_ports > 2) { "Server " + servername + "'s port security is too high" }
			else { ns.print("Server " + servername + " already has root access...") }
		}
		else { ns.print("Server " + servername + " doesn't exist?"); }
	}
}
