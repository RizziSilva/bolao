import useEmblaCarousel from "embla-carousel-react";
import { RightArrow } from "@statics";
import { BREACKPOINT, BUTTONS, STASTITICS_STAGES_ARRAY } from "../../constants";
import "./style.scss";

export function StastiticsSelector({
  setSelectedStastitics,
  selectedStastitics,
}) {
  const isMobile = window.innerWidth < BREACKPOINT.ACTIVE;
  const [emblaRef, emblaApi] = useEmblaCarousel({ active: isMobile });

  function handleCarouselClick(type) {
    if (type === BUTTONS.NEXT) emblaApi?.scrollNext();
    else if (BUTTONS.PREV) emblaApi?.scrollPrev();
  }

  function handleClick(id) {
    setSelectedStastitics(id);
  }

  function renderStages() {
    return STASTITICS_STAGES_ARRAY.map(({ id, label }) => {
      const isSelected = id === selectedStastitics;

      return (
        <button
          onClick={() => handleClick(id)}
          className={`${isSelected ? "selected" : ""} container-stage`}
          key={id}
        >
          {label}
        </button>
      );
    });
  }

  return (
    <div id="container-stastitics-stage-selector">
      <button
        className="button prev"
        onClick={() => handleCarouselClick(BUTTONS.PREV)}
      >
        <RightArrow />
      </button>
      <div className="viewport" ref={emblaRef}>
        <div className="container">{renderStages()}</div>
      </div>
      <button
        className="button"
        onClick={() => handleCarouselClick(BUTTONS.NEXT)}
      >
        <RightArrow />
      </button>
    </div>
  );
}
