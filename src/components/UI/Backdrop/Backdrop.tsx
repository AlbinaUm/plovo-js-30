interface Props {
    show: boolean;
    onClose?: () => void;
}

const Backdrop: React.FC<Props> = ({show, onClose}) => {
    return (
        <div className="modal-backdrop show"
             onClick={onClose}
             style={{display: show ? 'block' : 'none'}}>
        </div>
    );
};

export default Backdrop;