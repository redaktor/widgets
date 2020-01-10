import {
  DNode, v, w, WidgetBase, ThemedMixin, ThemedProperties, theme, customElement
} from '../widgets/common/Widget';
import { Size, Material } from '../widgets/common/util';

import Tab from '../widgets/tab';
import TabController from '../widgets/tab-controller';
import BasicFormTab from './tabs/BasicFormTab';
import TextInputTab from './tabs/TextInputTab';
import TextAreaTab from './tabs/TextAreaTab';
import SelectTab from './tabs/SelectTab';
import ProgressTab from './tabs/ProgressTab';
import SliderTab from './tabs/SliderTab';

export interface TabProperties extends ThemedProperties {
  size?: Size | keyof typeof Size;
  material?: Material | keyof typeof Material;
}
export const ThemedBase = ThemedMixin(WidgetBase);
export default class Tabs<P extends TabProperties = TabProperties> extends ThemedBase<P> {
	private _activeIndex = 0;

	private _requestTabChange(activeIndex: number) {
		this._activeIndex = activeIndex;
		this.invalidate();
	}

	render() {
    const { material, size } = this.properties;
		return w(TabController, {
			material: material,
			//alignButtons: 'left',
			activeIndex: this._activeIndex,
			onRequestTabChange: this._requestTabChange
		}, [
			w(Tab, {
				key: 'button-tab',
				label: 'Form Widgets'
			}, [ w(BasicFormTab, { size }) ]),
			w(Tab, {
				key: 'input-tab',
				label: 'Text Input'
			}, [ w(TextInputTab, { size }) ]),
			w(Tab, {
				key: 'text-area-tab',
				label: 'Text Area'
			}, [ w(TextAreaTab, { size }) ]),
			w(Tab, {
				key: 'select-tab',
				label: 'Selects'
			}, [ w(SelectTab, { size }) ]),
			w(Tab, {
				key: 'progress-tab',
				label: 'Progress'
			}, [ w(ProgressTab, { size }) ]),
			 w(Tab, {
				key: 'slider-tab',
				label: 'Slider'
			}, [ w(SliderTab, { size }) ])
		])
	}
}
