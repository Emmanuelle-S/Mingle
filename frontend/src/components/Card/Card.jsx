const Card = ( { Title, imgURL, Name, descTitle, desc, publicationDate } ) => {
  return (
    <article>
      <h2>Title</h2>
      <img src="#" alt="#" />
      <p>UserName</p>
      <h3>Short Description</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        deserunt doloremque alias, repellendus quis eaque mollitia nostrum,
        earum aliquam, autem nisi vel optio labore voluptatem molestias
        nesciunt. Quo, mollitia ea?
      </p>
      <p>Publication Date</p>
    </article>
  );
};

export default Card;
