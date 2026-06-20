import useEmblaCarousel from "embla-carousel-react";
import { STAGES_ARRAY } from "@constants";
import { RightArrow } from "@statics";
import { BREACKPOINT, BUTTONS } from "../../constants";
import "./style.scss";

export function StagesSelector({ setSelectedStage, selectedStage }) {
  const isMobile = window.innerWidth < BREACKPOINT.ACTIVE;
  const [emblaRef, emblaApi] = useEmblaCarousel({ active: isMobile });

  function handleCarouselClick(type) {
    if (type === BUTTONS.NEXT) emblaApi?.scrollNext();
    else if (BUTTONS.PREV) emblaApi?.scrollPrev();
  }

  function handleClick(id) {
    setSelectedStage(id);
  }

  function renderStages() {
    return STAGES_ARRAY.map(({ id, label }) => {
      const isSelected = id === selectedStage;

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
    <div id="container-stages-page">
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
