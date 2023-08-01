export default interface IVatsimEndpoints {
	data: {
		v3: string[];
		transceivers: string[];
		servers: string[];
		servers_sweatbox: string[];
		servers_all: string[];		
	},
	user: string[];
	metar: string[];
}
