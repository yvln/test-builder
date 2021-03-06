import styled from 'styled-components';
import { Description } from '../../../../ui/Description';
import { HorizontalSetting } from '../../../../ui/HorizontalSetting';
import { VerticalSetting } from '../../../../ui/VerticalSetting';

const ButtonSettings = ({ item, onChange }) => (
  <Wrapper key={item.id}>
    <HorizontalSetting>
      <Description>Background color</Description>
      <input
        defaultValue={item.attributes.buttonBackgroundColor}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.buttonBackgroundColor',
            value: e.target.value,
          })
        }
        type="color"
      />
    </HorizontalSetting>
    <HorizontalSetting>
      <Description>Color</Description>
      <input
        defaultValue={item.attributes.buttonColor}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.buttonColor',
            value: e.target.value,
          })
        }
        type="color"
      />
    </HorizontalSetting>
    <HorizontalSetting>
      <Description>Position</Description>
      <select
        defaultValue={item.attributes.horizontalAlign}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.horizontalAlign',
            value: e.target.value,
          })
        }
      >
        <option value="center">Center</option>
        <option value="flex-start">Left</option>
        <option value="flex-end">Right</option>
      </select>
    </HorizontalSetting>
    <HorizontalSetting>
      <Description>Font size</Description>
      <StyledInput
        type="number"
        defaultValue={item.attributes.buttonFontSize}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.buttonFontSize',
            value: parseInt(e.target.value, 10),
          })
        }
        $width="40px"
      />
    </HorizontalSetting>
    <HorizontalSetting>
      <Description>Border radius</Description>
      <StyledInput
        type="number"
        defaultValue={item.attributes.buttonRadius}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.buttonRadius',
            value: parseInt(e.target.value, 10),
          })
        }
        $width="40px"
      />
    </HorizontalSetting>
    <VerticalSetting>
      <Description>Link</Description>
      <StyledInput
        type="text"
        defaultValue={item.attributes.buttonLink}
        onChange={(e) =>
          onChange({
            settingKey: 'attributes.buttonLink',
            value: e.target.value,
          })
        }
        $width="100%"
      />
    </VerticalSetting>
  </Wrapper>
);

export default ButtonSettings;

const StyledInput = styled.input`
  width: ${({ $width }) => $width};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
