import { useStore } from "../hooks/store";
import LazyImage from "./LazyImage";

const PinCard = ({ data, onClick }) => {
    const { addPin, removePin, savedPins } = useStore();
    const isSaved = savedPins.some((p) => p.id === data.id);

    const handleSave = (e) => {
        e.stopPropagation(); // 모달 오픈 방지
        if (isSaved) {
            removePin(data.id);
        } else {
            addPin(data);
        }
    };

    return (
        <div className="pin-card" onClick={() => onClick(data)}>
            <div className="img-wrapper" style={{ backgroundColor: data.color }}>
                {/* <img src={data.urls.small} alt={data.alt_description} /> */}
                <LazyImage 
                    src={data.urls.small} 
                    alt={data.alt_description} 
                    placeholderColor={data.color} // Unsplash가 주는 대표 색상 활용
                />

                <button
                    type="button"
                    className={`btn-fav ${isSaved ? "active" : ""}`}
                    onClick={handleSave}
                >
                    {isSaved ? "좋아요 취소" : "좋아요"}
                </button>

                <div className="overlay">
                    <button className="save-btn">저장</button>
                </div>
            </div>
            <p className="description">{data.description || "No description"}</p>
        </div>
    );
};

export default PinCard;
