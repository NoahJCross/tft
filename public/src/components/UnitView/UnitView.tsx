import { Item, Unit } from "../../common/api";
import { UNIT_COLORS } from "../../data/UnitData";
import starGold from "../../assets/star-gold.svg";
import "./unitview.css";
import ItemView from "../ItemView/ItemView";
import { useDispatch } from "react-redux";
import { getElementPosition } from "../../utils/getElementPosition";
import { clearModalContent, setModalContent } from "../../store/modalSlice";
import { useEffect } from "react";

interface UnitViewProps {
  unit: Unit;
  items?: Item[];
  isStarred?: boolean;
  width?: number | string;
  height?: number | string;
}

const UnitView = ({ unit, items, isStarred, width = 48, height = width }: UnitViewProps) => {
  const dispatch = useDispatch();

  const handleMouseEnter = (e: React.MouseEvent) => {
    const position = getElementPosition(e.currentTarget as HTMLElement);
    dispatch(
      setModalContent({
        content: unit,
        position,
      })
    );
  };

  const handleMouseLeave = () => {
    dispatch(clearModalContent());
  };

  useEffect(() => {
    return () => {
      dispatch(clearModalContent());
    };
  }, [dispatch]);

  return (
    <div className="app__unitview">
      <div className="app__unitview-border" style={{ borderColor: UNIT_COLORS[unit.cost[0]], width, height }}>
        {isStarred && (
          <div className="app__unitview-stars">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="app__unitview-stars-star">
                <img src={starGold} alt="gold star" />
              </div>
            ))}
          </div>
        )}
        <img
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={unit.imageUrl}
          alt={unit.key}
          draggable="false"
        />
        <div className="app__unitview-items">
          {items && items.map((item, index) => <ItemView key={index} item={item} width={"33.3%"} height={"unset"} />)}
        </div>
      </div>
      <p className="p__opensans">{unit.name}</p>
    </div>
  );
};

export default UnitView;
