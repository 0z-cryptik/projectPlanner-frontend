import { EachSection } from "./eachSection";

export const SectionList = ({ sections }) => {
  return (
    <section>
      {sections.map((section, i) => {
        return (
          <EachSection
            section={section}
            key={i}
          />
        );
      })}
    </section>
  );
};
