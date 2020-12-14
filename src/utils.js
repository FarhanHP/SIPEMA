export const isEmail = (email) => {
  // eslint-disable-next-line
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return email.match(regex);
};

export const renderBody = body => {
  const arrBody = body.split("\n")

  const output = []

  for(let i of arrBody){
    output.push(i);

    output.push(<br/>);
  }

  output.pop();

  return output
}
