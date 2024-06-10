import IslandLayout from "components/IslandLayout";

interface Props {
  description?: string;
}

const WhoAreWe = ({ description }: Props) => {
  return (
    <IslandLayout>
      <div className="home_page_content">
        <div className="home_description">
          <h1 className="font-bold text-2xl">Who Are We</h1>
          <p>
            {description ||
              "Digital hives often have features like forums, chat rooms, blogs, and other tools for communication and collaboration. They can be used for a variety of purposes, such as networking, knowledge-sharing, and socializing."}
          </p>
        </div>
      </div>
    </IslandLayout>
  );
};

export default WhoAreWe;
