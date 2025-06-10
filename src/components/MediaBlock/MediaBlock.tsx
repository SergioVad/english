import { classNames } from '../../shared/helpers/classNames/classNames';
import cls from './MediaBlock.module.css';
import { memo, useState, useEffect } from 'react';

interface MediaBlockProps {
    className?: string;
}

export const MediaBlock = memo((props: MediaBlockProps) => {
    const { className } = props;

    const imagePaths = Array.from(
        { length: 44 },
        (_, i) => `../../shared/assets/img/media/${i + 1}.jpeg`,
    );

    const itemsPerPage = 3;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

    const totalItems = imagePaths.length;
    const totalPages = Math.max(totalItems - itemsPerPage + 1, 1); // минимум 1 страница

    const goToNextSlide = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const openModal = (index: number) => {
        setModalImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageIndex(null);
    };

    const goToNextImage = () => {
        if (
            modalImageIndex !== null &&
            modalImageIndex < imagePaths.length - 1
        ) {
            setModalImageIndex(modalImageIndex + 1);
        }
    };

    const goToPrevImage = () => {
        if (modalImageIndex !== null && modalImageIndex > 0) {
            setModalImageIndex(modalImageIndex - 1);
        }
    };

    // Закрытие на ESC / перелистывание на стрелки
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                goToNextImage();
            } else if (e.key === 'ArrowLeft') {
                goToPrevImage();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, modalImageIndex]);

    // Блокировка скролла при открытой модалке
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = ''; // сброс при размонтировании
        };
    }, [isModalOpen]);

    return (
        <div className={classNames(cls.MediaBlock, {}, [className])}>
            <h3>Как выглядит наша школа</h3>

            <div className={cls.sliderWrapper}>
                <button
                    className={cls.navButton}
                    onClick={goToPrevSlide}
                    disabled={currentIndex === 0}
                    aria-label="Предыдущий слайд"
                >
                    &larr;
                </button>

                <div className={cls.carouselContainer}>
                    <div
                        className={cls.carouselTrack}
                        style={{
                            transform: `translateX(-${
                                currentIndex * (500 + 16)
                            }px)`,
                            transition: 'transform 0.5s ease',
                        }}
                    >
                        {imagePaths.map((path, index) => (
                            <div
                                key={index}
                                className={cls.slide}
                                onClick={() => openModal(index)}
                                role="button"
                                tabIndex={0}
                                aria-label={`Посмотреть фото ${
                                    index + 1
                                } в полном размере`}
                            >
                                <img
                                    src={new URL(path, import.meta.url).href}
                                    alt={`Image ${index + 1}`}
                                    loading="lazy"
                                    className={cls.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className={cls.navButton}
                    onClick={goToNextSlide}
                    disabled={currentIndex >= totalPages - 1}
                    aria-label="Следующий слайд"
                >
                    &rarr;
                </button>
            </div>

            {/* Модальное окно */}
            {isModalOpen && modalImageIndex !== null && (
                <div className={cls.modalOverlay} onClick={closeModal}>
                    <button
                        className={cls.modalNavButtonLeft}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPrevImage();
                        }}
                    >
                        &larr;
                    </button>

                    <div
                        className={cls.modalImageWrapper}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={
                                new URL(
                                    imagePaths[modalImageIndex],
                                    import.meta.url,
                                ).href
                            }
                            alt={`Фото ${modalImageIndex + 1}`}
                            className={cls.modalImage}
                            loading="lazy"
                        />
                    </div>

                    <button
                        className={cls.modalNavButtonRight}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToNextImage();
                        }}
                    >
                        &rarr;
                    </button>

                    <button
                        className={cls.modalCloseButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                        }}
                        aria-label="Закрыть"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
});

MediaBlock.displayName = 'MediaBlock';
