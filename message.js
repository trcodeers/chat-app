var generatemessage = (text) => {

return {
	text,
	createdAt: new Date().getTime()
	}	

}

module.exports = {
	generatemessage
}