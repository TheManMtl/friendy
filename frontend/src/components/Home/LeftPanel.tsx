import React, { useEffect, useState } from "react";
import Advertisment from "./Advertisment";

type LeftPanelProps = {};

const LeftPanel: React.FC<LeftPanelProps> = ({}) => {
  const [description, setDescription] = useState<String[]>([
    "Empowering success through innovative solutions and collaborative partnerships.",
    "Where creativity meets strategy, excellence unfolds.",
    "Driving growth, one idea at a time.",
    "Crafting tomorrow's success stories today.",
    "Innovate, inspire, ignite - fueling businesses for a brighter future.",
    "Your journey to success, our commitment to excellence.",
    "Elevating businesses with passion and purpose.",
    "Transforming challenges into opportunities for thriving enterprises.",
    "Strategic vision, exceptional results.",
    "Pioneering excellence, redefining possibilities.",
    "Revolutionizing industries through visionary leadership.",
    "Synergy in action, shaping the future of business.",
    "Beyond boundaries, building legacies.",
    "Innovation that matters, success that lasts.",
    "Where ambition meets achievement, and dreams become reality.",
    "Inspiring growth, driving change.",
    "Unleashing potential, delivering excellence.",
    "Your success, our mission.",
    "In the business of making dreams a reality.",
    "Creating value, fostering success, and exceeding expectations.",
  ]);
  const [businessName, setBusinessName] = useState<String[]>([
    "Innovative Success Solutions",
    "Strategic Excellence Hub",
    "Growth Catalyst Ideas",
    "Tomorrow's Success Crafters",
    "InspireFuel Innovations",
    "Journey to Excellence Partners",
    "Passion & Purpose Enterprises",
    "Opportunity Transformations Inc.",
    "Visionary Results Strategies",
    "Pioneer Possibilities Ventures",
    "Revolutionary Leadership Industries",
    "Synergy Shapers Group",
    "Boundless Legacy Builders",
    "Impactful Innovations Ltd.",
    "Achievement Ambitions Co.",
    "Inspiring Change Solutions",
    "Potential Unleashed Ventures",
    "Mission Success Enterprises",
    "Dream Reality Creations",
    "Value-Driven Success Solutions",
  ]);

  const shuffle = (array: String[]) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    setBusinessName((prevBusinessName) => shuffle([...prevBusinessName]));
    setDescription((prevDescription) => shuffle([...prevDescription]));
  }, []);

  return (
    <div className="container ">
      <div className="row mt-3">
        <div className="col-12 fs-4">Friendy Advertisers</div>
        <div className="col-12 mb-3">
          <Advertisment
            businessName={businessName[0]}
            description={description[0]}
            renderNum={1}
          />
        </div>

        <div className="col-12 mb-3">
          <Advertisment
            businessName={businessName[1]}
            description={description[1]}
            renderNum={2}
          />
        </div>

        <div className="col-12 ">
          <Advertisment
            businessName={businessName[2]}
            description={description[2]}
            renderNum={3}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
