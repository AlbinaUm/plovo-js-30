import Backdrop from "../Backdrop/Backdrop.tsx";
import {AnimatePresence, motion, type Variants} from 'framer-motion';

interface Props extends React.PropsWithChildren{
    show: boolean;
    title?: string;
    onClose?: () => void;
}

const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.5,
        y: '-200%'
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: '-50%',
        transition: {
            duration: 1,
            ease: "easeOut"
        },
    },
    exit: {
        opacity: 0,
        scale: 0.5,
        y: '-200%',
        transition: {
            duration: 1,
            ease: "easeIn"
        }
    },
};

const Modal: React.FC<Props> = ({show, title='', children, onClose}) => {
    return (
        <>
            <AnimatePresence>
                {show &&
                    (
                        <>
                            <Backdrop show={show} onClose={onClose}/>
                            <motion.div
                                className="modal show"
                                variants={modalVariants}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                                style={{
                                    display: 'block',
                                    height: '300px',
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    x: '-50%',
                                    y: '-50%',
                                    zIndex: 1050,
                                }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="row row-cols-2 align-items-center justify-content-between px-3 pt-3">
                                            <div className="col-6"><h1 className="modal-title fs-5 text-center">{title}</h1></div>
                                        </div>
                                        <hr/>
                                        <div className="px-3">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence>
        </>
    );
};

export default Modal;