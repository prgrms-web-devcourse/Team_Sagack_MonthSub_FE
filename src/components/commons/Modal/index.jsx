import styled from '@emotion/styled';
import { React, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useClickAway } from '@hooks';
import PropTypes from 'prop-types';

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width};
  transform: translate(-50%, -50%);
  padding: 8px;
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const Modal = ({ children, width, height, visible, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });

  const containerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height],
  );

  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  });

  return ReactDOM.createPortal(
    <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
      <ModalContainer
        ref={ref}
        {...props}
        style={{ ...props.style, ...containerStyle }}
      >
        {children}
      </ModalContainer>
    </BackgroundDim>,
    el,
  );
};

export default Modal;

Modal.defaultProps = {
  visible: false,
  width: '400px',
  height: 'auto',
  onClose: () => {},
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClose: PropTypes.func,
};
