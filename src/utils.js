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

export const renderPrice = price => {
  const strPrice = String(price);

  const output = [];

  let count = 0;

  for(let i=strPrice.length; i>=0; i--){
    output.splice(0, 0, strPrice.charAt(i));

    if(count !== 0 && count%3 === 0 && i!==0){
      output.splice(0, 0, ".")
    }

    count++
  }

  return output.join("");
}
