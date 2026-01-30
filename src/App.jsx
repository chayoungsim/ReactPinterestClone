import Masonry from "react-masonry-css";
import PinCard from "./components/PinCard";
import Modal from "./Modal";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
//import mockData from './data.json';
import "./App.scss";

function MainFeed() {
    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        700: 3,
        500: 2,
    };

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const loader = useRef(null);
    const ACCESS_KEY = "yH5mhqi3eLvZfSFx4dJ6Acu0d89IrLAOVph0lSGZbDs";

    const fetchImages = async (pageNum) => {
        try {
            setLoading(true);
            const response = await axios.get("https://api.unsplash.com/photos", {
                params: {
                    client_id: ACCESS_KEY,
                    page: pageNum,
                    per_page: 10,
                },
            });
            console.log(response.data);
            setImages((prev) => [...prev, ...response.data]);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                alert("API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요!");
            }
            console.error("데이터 로드 에러:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(page);
    }, [page]);

    // const fetchMoreData = () => {
    //     const itemsPerPage = 6;
    //     const startIndex = (page - 1) * itemsPerPage;
    //     const nextItems = mockData.slice(startIndex, startIndex + itemsPerPage);
    //     if (nextItems.length > 0) {
    //         setImages((prev) => [...prev, ...nextItems]); // 기존 데이터 + 새 데이터 합치기
    //     }
    // }
    // useEffect( () => {
    //     fetchMoreData()
    //     setLoading(false);
    // },[page])

    // 3. Intersection Observer 설정
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1.0 },
        );

        if (loader.current) {
            observer.observe(loader.current); //감시시작
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current); //정리
            }
        };
    });

    if (loading && images.length === 0) return <div>로딩 중...</div>;

    const openModal = (image) => {
        // 상태(state)에 background를 담아 모달 라우트로 이동
        navigate(`/pin/${image.id}`, { state: { background: location, image } });
    };

    return (
        <div className="container">
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.map((img) => (
                    <PinCard key={img.id} data={img} onClick={openModal} />
                ))}
            </Masonry>
            {/* 4. 감시자 역할을 할 빈 div */}
            <div ref={loader} style={{ height: "100px", background: "transparent" }}>
                {/* 로딩 중 표시를 여기에 넣으면 좋습니다 */}
                <p style={{ textAlign: "center" }}>데이터 로딩 중...</p>
            </div>
        </div>
    );
}

function DetailModal() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const image = state?.image;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!image) return null; // 직접 접속 시 데이터가 없으면 아무것도 렌더링 안 함 (추후 API 호출 추가 가능)

    return <Modal image={image} onClose={() => navigate(-1)} />;
}

function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<MainFeed />} />
            </Routes>
            <AnimatePresence>
                {background && (
                    <Routes location={location}>
                        <Route path="/pin/:id" element={<DetailModal />} />
                    </Routes>
                )}
            </AnimatePresence>
        </>
    );
}

export default App;
