let str = `
  <p>
    <img src="aaaa" >
    <img src="ccc" >
    <img src="bbb" >
  </p>
`;

str.match(/<img(?!<).*>/g);
