import styled, { css } from 'styled-components';

import ButtonSettings from './ButtonSettings';

const Button = ({ item, onClick, designMode }) => (
  <Wrapper
    $attributes={item?.attributes}
    $designMode={designMode}
    onClick={onClick}
    {...designMode & { "data-testid": item.id }}
  >
    <a
      href={item?.attributes.buttonLink}
      tabIndex={-1}
      {...(item?.attributes.buttonLinkNewPage && { target: '_blank' })}
    >
      <StyledButton $attributes={item?.attributes}>{item.content}</StyledButton>{' '}
    </a>
  </Wrapper>
);

Button.componentLabel = 'Button';
Button.componentType = 'single';
Button.canBeListed = true;

Button.item = {
  attributes: {
    buttonBackgroundColor: '#06D6A0',
    buttonColor: '#ffffff',
    buttonFontSize: 16,
    buttonRadius: 4,
    horizontalAlign: 'center',
  },
  content: 'Button',
  label: Button.componentLabel,
  type: Button.componentType,
};

Button.Settings = ButtonSettings;

export default Button;

const StyledButton = styled.button`
  ${({ $attributes }) => css`
    // reset button style
    border: none;
    padding: ${Math.round($attributes?.buttonFontSize / 2)}px
      ${$attributes?.buttonFontSize}px;
    :hover {
      cursor: inherit;
    }

    background-color: ${$attributes?.buttonBackgroundColor};
    border-radius: ${$attributes?.buttonRadius}px;
    color: ${$attributes?.buttonColor};
    font-size: ${$attributes?.buttonFontSize}px;
  `}
`;

const Wrapper = styled.div`
  border: dashed 2px transparent;
  display: flex;
  justify-content: ${({ $attributes }) => $attributes?.horizontalAlign};

  ${({ $designMode }) =>
    $designMode &&
    css`
      padding: 30px 0px;
      :hover {
        border: dashed 2px #ccc;
      }
    `};
`;
