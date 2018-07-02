module.exports = (channel) => {
  if(channel.name == "muted") {
    channel.setParent('383824712784150558');
    console.log(channel.name);
  };
};