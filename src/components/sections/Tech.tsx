import { SectionWrapper } from "../../hoc";
import { technologies } from "../../constants";

const Tech = () => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {technologies.map((technology) => (
          <div
            className="group h-32 w-32 flex flex-col justify-center items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-sm border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-110 transition-all duration-300 cursor-pointer p-4"
            key={technology.name}
          >
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
            <span className="text-xs text-purple-200 font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity">
              {technology.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");
