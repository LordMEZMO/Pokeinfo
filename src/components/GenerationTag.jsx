export const GenerationTag = ({ generation }) => {
    let gen = generation
      .slice(0, 11)
      .concat(generation.slice(11).toUpperCase());
    gen = gen.replace("-", " ");
    return (
      <div className="tag is-info">
        <span className="capitalized">{gen}</span>
      </div>
    );
};