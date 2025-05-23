import React, { Fragment, useState } from 'react';
import { SanitizedExperience } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

type ListItemProps = {
  time: React.ReactNode;
  position?: React.ReactNode;
  company?: React.ReactNode;
  companyLink?: string;
  projects?: string[];
  isExpanded?: boolean;
  onClick?: () => void;
};

const ListItem = ({
  time,
  position,
  company,
  companyLink,
  projects,
  isExpanded,
  onClick,
}: ListItemProps) => (
  <li className="mb-5 ml-4 cursor-pointer" onClick={onClick}>
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    ></div>
    <div className="my-0.5 text-xs">{time}</div>
    <h3 className="font-semibold text-lg">{position}</h3>
    <div className="mb-2 font-medium text-base">
      <a href={companyLink} target="_blank" rel="noreferrer">
        {company}
      </a>
    </div>
    {isExpanded && projects && (
      <ul className="ml-4 list-disc text-base text-base-content text-opacity-90">
        {projects.map((proj, i) => (
          <li key={i} className="mb-1">{proj}</li>
        ))}
      </ul>
    )}
  </li>
);

const ExperienceCard = ({
  experiences,
  loading,
}: {
  experiences: SanitizedExperience[];
  loading: boolean;
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          time={skeleton({ widthCls: 'w-5/12', heightCls: 'h-4' })}
          position={skeleton({ widthCls: 'w-6/12', heightCls: 'h-4', className: 'my-1.5' })}
          company={skeleton({ widthCls: 'w-6/12', heightCls: 'h-3' })}
        />,
      );
    }
    return array;
  };

  return (
    <div className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h5 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">Experience</span>
            )}
          </h5>
        </div>
        <div className="text-base-content text-opacity-60">
          <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
            {loading ? (
              renderSkeleton()
            ) : (
              <Fragment>
                {experiences.map((experience, index) => (
                  <ListItem
                    key={index}
                    time={`${experience.from} - ${experience.to}`}
                    position={experience.position}
                    company={experience.company}
                    companyLink={experience.companyLink}
                    projects={experience.projects} // must be added in your data
                    isExpanded={expandedIndex === index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
              </Fragment>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};


export default ExperienceCard;
