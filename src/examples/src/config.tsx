// import dojoTheme from '@dojo/widgets/theme/dojo';
import materialTheme from '../../theme/material';
import * as light from '../../theme/material/variants/light.m.css';
import * as dark from '../../theme/material/variants/dark.m.css';

import ButtonOverview from './widgets/button/Overview';
import ButtonFlat from './widgets/button/Basic';
import ButtonFilled from './widgets/button/Filled';
import ButtonOutlined from './widgets/button/Outlined';
import ButtonRaised from './widgets/button/Raised';
import ButtonShaped from './widgets/button/Shaped';
import ButtonToggle from './widgets/button/ToggleButton';

import CheckboxOverview from './widgets/checkbox/Overview';
import CheckboxFlat from './widgets/checkbox/Basic';
import CheckboxFilled from './widgets/checkbox/Filled';
import CheckboxOutlined from './widgets/checkbox/Outlined';
import CheckboxRaised from './widgets/checkbox/Raised';
import CheckboxShaped from './widgets/checkbox/Shaped';
import CheckboxDisabled from './widgets/checkbox/Disabled';
import CheckboxReadonly from './widgets/checkbox/Readonly';
import CheckboxCustomLabel from './widgets/checkbox/CustomLabel';

import RadioOverview from './widgets/radio/Overview';
import RadioFlat from './widgets/radio/Basic';
import RadioFilled from './widgets/radio/Filled';
import RadioOutlined from './widgets/radio/Outlined';
import RadioRaised from './widgets/radio/Raised';
import RadioShaped from './widgets/radio/Shaped';
import RadioChecked from './widgets/radio/Checked';
import RadioEvents from './widgets/radio/Events';
import RadioDisabled from './widgets/radio/Disabled';
import RadioLabelled from './widgets/radio/Labelled';

import SwitchOverview from './widgets/switch/Overview';
import SwitchFlat from './widgets/switch/Basic';
import SwitchFilled from './widgets/switch/Filled';
import SwitchOutlined from './widgets/switch/Outlined';
import SwitchRaised from './widgets/switch/Raised';
import SwitchShaped from './widgets/switch/Shaped';
import SwitchDisabled from './widgets/switch/Disabled';

import TextInputOverview from './widgets/text-input/Overview';
import TextInputFlat from './widgets/text-input/Basic';
import TextInputFilled from './widgets/text-input/Filled';
import TextInputOutlined from './widgets/text-input/Outlined';
import TextInputRaised from './widgets/text-input/Raised';
import TextInputShaped from './widgets/text-input/Shaped';
import TextInputControlled from './widgets/text-input/Controlled';
import TextInputDisabled from './widgets/text-input/Disabled';
import TextInputHelper from './widgets/text-input/HelperText';
import TextInputHiddenLabel from './widgets/text-input/HiddenLabel';
import TextInputPlaceholder from './widgets/text-input/Placeholder';
import TextInputLeadingTrailing from './widgets/text-input/LeadingTrailing';
import TextInputValidated from './widgets/text-input/Validated';
import TextInputWithLabel from './widgets/text-input/WithLabel';

import TextAreaOverview from './widgets/text-area/Overview';
import TextAreaControlled from './widgets/text-area/Controlled';
import TextAreaWithLabel from './widgets/text-area/Label';
import TextAreaDisabled from './widgets/text-area/Disabled';
import TextAreaHelper from './widgets/text-area/HelperText';
import TextAreaHiddenLabel from './widgets/text-area/HiddenLabel';
import ValidatedCustomTextArea from './widgets/text-area/ValidatedCustom';
import ValidatedRequiredTextArea from './widgets/text-area/ValidatedRequired';

import CheckboxBasicGroup from './widgets/checkbox-group/Basic';
import CheckboxCustomLabelGroup from './widgets/checkbox-group/CustomLabel';
import CustomRendererCheckboxGroup from './widgets/checkbox-group/CustomRenderer';
import InitialValueCheckboxGroup from './widgets/checkbox-group/InitialValue';
import ControlledCheckboxGroup from './widgets/checkbox-group/Controlled';

import RadioBasicGroup from './widgets/radio-group/Basic';
import ControlledRadioGroup from './widgets/radio-group/Basic';
import CustomLabelRadioGroup from './widgets/radio-group/CustomLabel';
import CustomRendererRadioGroup from './widgets/radio-group/CustomRenderer';
import InitialValueRadioGroup from './widgets/radio-group/InitialValue';

import ChipOverview from './widgets/chip/Overview';
import ChipClickable from './widgets/chip/Clickable';
import ChipClickableClosable from './widgets/chip/ClickableClosable';
import ChipClosable from './widgets/chip/Closable';
import ClosableRendererChip from './widgets/chip/ClosableRenderer';
import ChipDisabled from './widgets/chip/Disabled';
import ChipIcon from './widgets/chip/Icon';

import ActionButtons from './widgets/card/ActionButtons';
import ActionButtonsAndIcons from './widgets/card/ActionButtonsAndIcons';
import ActionIcons from './widgets/card/ActionIcons';
import BasicCard from './widgets/card/Basic';
import CardCombined from './widgets/card/CardCombined';
import CardWithMediaContent from './widgets/card/CardWithMediaContent';
import CardWithMediaRectangle from './widgets/card/CardWithMediaRectangle';
import CardWithMediaSquare from './widgets/card/CardWithMediaSquare';
import Cards from './widgets/cards/Basic';

import BasicHeaderCard from './widgets/header-card/Basic';
import MediaHeaderCard from './widgets/header-card/MediaCard';
import ActionHeaderCard from './widgets/header-card/ActionCard';

import BasicProgress from './widgets/progress/Basic';
import ProgressVariants from './widgets/progress/Variants';
import ProgressCircular from './widgets/progress/Circular';
import ProgressTicks from './widgets/progress/ProgressWithTicks';
import ProgressRounded from './widgets/progress/ProgressRounded';
import ProgressWithChangingValues from './widgets/progress/ProgressWithChangingValues';
import ProgressWithCustomOutput from './widgets/progress/ProgressWithCustomOutput';
import ProgressWithMax from './widgets/progress/ProgressWithMax';
import ProgressWithoutOutput from './widgets/progress/ProgressWithoutOutput';

import BasicSlider from './widgets/slider/Basic';
import SliderVariants from './widgets/slider/Variants';
import SliderWithCustomOutput from './widgets/slider/SliderWithCustomOutput';
import SliderWithTicks from './widgets/slider/SliderWithTicks';
import SliderDisabled from './widgets/slider/DisabledSlider';
import SliderVertical from './widgets/slider/VerticalSlider';
import SliderWithNoOutput from './widgets/slider/SliderWithNoOutput';
import SliderWithValidityCheck from './widgets/slider/SliderWithValidityCheck';
import SliderControlled from './widgets/slider/Controlled';

import BasicAccordionPane from './widgets/accordion/Basic';
import BasicAvatar from './widgets/avatar/Basic';
import ImageAvatar from './widgets/avatar/Image';
import AvatarVariant from './widgets/avatar/Variant';
import AvatarShape from './widgets/avatar/Shape';
import AvatarSize from './widgets/avatar/Size';
import AvatarIcon from './widgets/avatar/Icon';
import AvatarSecondary from './widgets/avatar/Secondary';
import Exclusive from './widgets/accordion/Exclusive';
import BasicBreadcrumbGroup from './widgets/breadcrumb-group/Basic';
import CustomRendererBreadcrumbGroup from './widgets/breadcrumb-group/CustomRenderer';
import BasicCalendar from './widgets/calendar/Basic';
import FirstDayOfWeekCalendar from './widgets/calendar/CustomFirstWeekDay';
import LimitedRange from './widgets/calendar/LimitedRange';
import InitialMonthAndYear from './widgets/calendar/InitialMonthAndYear';
import FullyControlledCalendar from './widgets/calendar/FullyControlled';

import BasicContextMenu from './widgets/context-menu/Basic';
import BasicConstrainedInput from './widgets/constrained-input/Basic';
import Username from './widgets/constrained-input/Username';
import BasicContextPopup from './widgets/context-popup/Basic';
import BasicDialog from './widgets/dialog/Basic';
import CloseableDialog from './widgets/dialog/CloseableDialog';
import ModalDialog from './widgets/dialog/ModalDialog';
import UnderlayDialog from './widgets/dialog/UnderlayDialog';
import AlertDialog from './widgets/dialog/AlertDialog';
import AnimatedDialog from './widgets/dialog/AnimatedDialog';
import FocusTrappedDialog from './widgets/dialog/FocusTrappedDialog';
import ActionsDialog from './widgets/dialog/ActionsDialog';
import BasicEmailInput from './widgets/email-input/Basic';
import Advanced from './widgets/grid/Advanced';
import BasicForm from './widgets/form/Basic';
import ControlledForm from './widgets/form/Basic';
import ValidationForm from './widgets/form/Validation';
import InitialValueForm from './widgets/form/InitialValueForm';
import FillingForm from './widgets/form/FillingForm';
import RequiredFieldsForm from './widgets/form/RequiredFieldsForm';
import DisabledFieldsForm from './widgets/form/DisabledFieldsForm';
import DisabledForm from './widgets/form/DisabledForm';
import ResettingForm from './widgets/form/ResettingForm';
import SubmitForm from './widgets/form/SubmitForm';
import KitchenSinkForm from './widgets/form/KitchenSinkForm';
import ActionForm from './widgets/form/ActionForm';
import BasicGrid from './widgets/grid/Basic';
import ColumnResize from './widgets/grid/ColumnResize';
import CustomCellRenderer from './widgets/grid/CustomCellRenderer';
import GridCustomFilterRenderer from './widgets/grid/CustomFilterRenderer';
import CustomSortRenderer from './widgets/grid/CustomSortRenderer';
import EditableCells from './widgets/grid/EditableCells';
import Filtering from './widgets/grid/Filtering';
import Paginated from './widgets/grid/Paginated';
import Restful from './widgets/grid/Restful';
import RowSelection from './widgets/grid/RowSelection';
import Sorting from './widgets/grid/Sorting';
import AltTextIcon from './widgets/icon/AltText';
import BasicIcons from './widgets/icon/Basic';
import IconButton from './widgets/icon/IconButton';
import BasicLabel from './widgets/label/Basic';
import HiddenLabel from './widgets/label/HiddenLabel';
import InvalidLabel from './widgets/label/InvalidLabel';
import DisabledLabel from './widgets/label/DisabledLabel';
import SecondaryLabel from './widgets/label/SecondaryLabel';
import BasicList from './widgets/list/Basic';
import DividedList from './widgets/list/Dividers';
import ControlledList from './widgets/list/Controlled';
import ItemRenderer from './widgets/list/ItemRenderer';
import FetchedResource from './widgets/list/FetchedResource';
import Menu from './widgets/list/Menu';
import CustomTransformer from './widgets/list/CustomTransformer';
import BasicMultiSelectTypeahead from './widgets/multi-select-typeahead/Basic';
import ControlledMultiSelectTypeahead from './widgets/multi-select-typeahead/Controlled';
import DisabledMultiSelectTypeahead from './widgets/multi-select-typeahead/Disabled';
import CustomRendererMultiSelectTypeahead from './widgets/multi-select-typeahead/CustomRenderer';
import BottomMultiSelectTypeahead from './widgets/multi-select-typeahead/BottomPlacement';
import BasicNumberInput from './widgets/number-input/Basic';
import ValidatedNumberInput from './widgets/number-input/Validation';
import BasicPassword from './widgets/password-input/Basic';
import NoRules from './widgets/password-input/NoRules';
import BasicTriggerPopup from './widgets/trigger-popup/Basic';
import MenuTriggerPopup from './widgets/trigger-popup/MenuPopup';
import SetWidth from './widgets/trigger-popup/SetWidth';
import Underlay from './widgets/trigger-popup/Underlay';

import BasicRangeSlider from './widgets/range-slider/Basic';
import MinMaxRangeSlider from './widgets/range-slider/MinMax';
import TooltipRangeSlider from './widgets/range-slider/Tooltip';
import EventsRangeSlider from './widgets/range-slider/Events';
import DisabledRangeSlider from './widgets/range-slider/Disabled';
import RequiredRangeSlider from './widgets/range-slider/Required';
import LabelledRangeSlider from './widgets/range-slider/Labelled';
import ControlledRangeSlider from './widgets/range-slider/Controlled';
import AdditionalText from './widgets/select/AdditionalText';
import BasicSelect from './widgets/select/Basic';
import ControlledSelect from './widgets/select/Controlled';
import CustomRenderer from './widgets/select/CustomRenderer';
import DisabledSelect from './widgets/select/DisabledSelect';
import RequiredSelect from './widgets/select/RequiredSelect';
import BasicSlidePane from './widgets/slide-pane/Basic';
import RightAlignSlidePane from './widgets/slide-pane/RightAlignSlidePane';
import LeftAlignSlidePane from './widgets/slide-pane/LeftAlignSlidePane';
import BottomAlignSlidePane from './widgets/slide-pane/BottomAlignSlidePane';
import UnderlaySlidePane from './widgets/slide-pane/UnderlaySlidePane';
import FixedWidthSlidePane from './widgets/slide-pane/FixedWidthSlidePane';
import BasicSnackbar from './widgets/snackbar/Basic';
import ErrorSnackbar from './widgets/snackbar/Error';
import LeadingSnackbar from './widgets/snackbar/Leading';
import StackedSnackbar from './widgets/snackbar/Stacked';
import SuccessSnackbar from './widgets/snackbar/Success';
import BasicTabController from './widgets/tab-controller/Basic';
import ControlledTabController from './widgets/tab-controller/Controlled';
import ButtonAlignmentTabController from './widgets/tab-controller/ButtonAlignment';
import CloseableTabController from './widgets/tab-controller/Closeable';
import DisabledTabController from './widgets/tab-controller/Disabled';

import BasicThreeColumnLayout from './widgets/three-column-layout/Basic';
import TwelveHourTimePicker from './widgets/time-picker/12HourTime';
import BasicTimePicker from './widgets/time-picker/Basic';
import ControlledTimePicker from './widgets/time-picker/Controlled';
import DisabledTimePicker from './widgets/time-picker/Disabled';
import DisabledMenuItemsTimePicker from './widgets/time-picker/DisabledMenuItems';
import RequiredTimePicker from './widgets/time-picker/Required';
import SelectBySecondTimePicker from './widgets/time-picker/SelectBySecond';
import BasicTitlePane from './widgets/title-pane/Basic';
import HeadingLevel from './widgets/title-pane/HeadingLevel';
import NonCloseable from './widgets/title-pane/NonCloseable';
import BasicTooltip from './widgets/tooltip/Basic';
import ClickTooltip from './widgets/tooltip/Click';
import FocusTooltip from './widgets/tooltip/Focus';
import BasicNativeSelect from './widgets/native-select/Basic';
import ControlledNativeSelect from './widgets/native-select/ControlledNativeSelect';
import BasicDateInput from './widgets/date-input/Basic';
import ControlledDateInput from './widgets/date-input/Controlled';
import BasicLoadingIndicator from './widgets/loading-indicator/Basic';
import BasicHeader from './widgets/header/Basic';
import LeadingHeader from './widgets/header/Leading';
import StickyHeader from './widgets/header/Sticky';
import TrailingHeader from './widgets/header/Trailing';
import BasicGlobalEvent from './widgets/global-event/Basic';
import Pagination from './widgets/pagination/Basic';
import PaginationPageSizeSelector from './widgets/pagination/PageSizeSelector';
import PaginationControlled from './widgets/pagination/Controlled';
import PaginationSiblingCount from './widgets/pagination/SiblingCount';
import BasicTypeahead from './widgets/typeahead/Basic';
import RemoteTypeahead from './widgets/typeahead/RemoteSource';
import ValidatedTypeahead from './widgets/typeahead/Validation';
import BasicTwoColumnLayout from './widgets/two-column-layout/Basic';
import TrailingBiasTwoColumnLayout from './widgets/two-column-layout/TrailingBias';
import CollapsingLayout from './widgets/two-column-layout/Collapsing';

`!has('docs')`;
import testsContext from './tests';
const tests = typeof testsContext !== 'undefined' ? testsContext : { keys: () => [] };

export const config = {
	name: '@redaktor/widgets',
	home: 'src/examples/README.md',
	themes: [
		{
			label: 'material',
			theme: materialTheme,
			variants: {
				default: light,
				dark,
				light
			}
		}
	],
	tests,
	readmePath: (widget: string) => `src/${widget}/README.md`,
	widgetPath: (widget: string, filename: string) => `src/${widget}/${filename || 'index'}.tsx`,
	examplePath: (widget: string, filename: string) =>
		`src/examples/src/widgets/${widget}/${filename || 'index'}.tsx`,
	codesandboxPath: (widget: string, filename: string, themeName?: string) => {
		return `https://codesandbox.io/s/github/dojo/widgets/tree/master/src/examples?fontsize=14&initialpath=%23%2Fwidget%2F${widget}%2Fsandbox%2F${filename.toLowerCase()}?theme=${themeName}&module=%2Fsrc%2Fwidgets%2F${widget}%2F${filename}.tsx`;
	},
	widgets: {
		accordion: {
			examples: [
				{
					filename: 'Exclusive',
					module: Exclusive
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicAccordionPane
				}
			}
		},
		avatar: {
			examples: [
				{
					title: 'Avatar with image',
					filename: 'Image',
					module: ImageAvatar
				},
				{
					title: 'Avatar variants',
					filename: 'Variant',
					module: AvatarVariant
				},
				{
					title: 'Avatar shapes',
					filename: 'Shape',
					module: AvatarShape
				},
				{
					title: 'Avatar with secondary colors',
					filename: 'Secondary',
					module: AvatarSecondary
				},
				{
					title: 'Avatar sizes',
					filename: 'Size',
					module: AvatarSize
				},
				{
					title: 'Avatar with Icons',
					filename: 'Icon',
					module: AvatarIcon
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicAvatar
				}
			}
		},
		'breadcrumb-group': {
			examples: [
				{
					filename: 'CustomRenderer',
					module: CustomRendererBreadcrumbGroup,
					title: 'Custom Renderer'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicBreadcrumbGroup
				}
			}
		},
		button: {
			filename: 'index',
			overview: {
				example: {
					filename: 'Overview',
					module: ButtonOverview
				}
			},
			examples: [
				{
					filename: 'Basic',
					module: ButtonFlat,
					title: 'Flat (default)'
				},
				{
					filename: 'Filled',
					module: ButtonFilled,
					title: 'Filled Button'
				},
				{
					filename: 'Outlined',
					module: ButtonOutlined,
					title: 'Outlined Button'
				},
				{
					filename: 'Raised',
					module: ButtonRaised,
					title: 'Raised Button'
				},
				{
					filename: 'Shaped',
					module: ButtonShaped,
					title: 'Shaped Button'
				},
				{
					filename: 'ButtonToggle',
					module: ButtonToggle,
					title: 'Toggle Button'
				}
			]
		},


		checkbox: {
			filename: 'index',
			overview: {
				example: {
					filename: 'Overview',
					module: CheckboxOverview
				}
			},
			examples: [
				{
					filename: 'Basic',
					module: CheckboxFlat,
					title: 'Flat (default)'
				},
				{
					filename: 'Filled',
					module: CheckboxFilled,
					title: 'Filled Checkbox'
				},
				{
					filename: 'Outlined',
					module: CheckboxOutlined,
					title: 'Outlined Checkbox'
				},
				{
					filename: 'Raised',
					module: CheckboxRaised,
					title: 'Raised Checkbox'
				},
				{
					filename: 'Shaped',
					module: CheckboxShaped,
					title: 'Shaped Checkbox'
				},
				{ title: 'Disabled', module: CheckboxDisabled, filename: 'Disabled' },
				{ title: 'Readonly', module: CheckboxReadonly, filename: 'Readonly' },
				{ title: 'Custom Label', module: CheckboxCustomLabel, filename: 'CustomLabel' }
			]
		},
		'checkbox-group': {
			examples: [
				{
					filename: 'InitialValue',
					module: InitialValueCheckboxGroup,
					title: 'Initial Value'
				},
				{
					filename: 'CustomLabel',
					module: CheckboxCustomLabelGroup,
					title: 'Custom Label'
				},
				{
					filename: 'CustomRenderer',
					module: CustomRendererCheckboxGroup,
					title: 'Custom Renderer'
				},
				{
					filename: 'Controlled',
					module: ControlledCheckboxGroup,
					title: 'Controlled'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: CheckboxBasicGroup
				}
			}
		},
		calendar: {
			examples: [
				{
					filename: 'CustomFirstWeekDay',
					module: FirstDayOfWeekCalendar,
					title: 'Custom First Day of Week'
				},
				{
					description: 'Demonstrates limiting the selectable region of the calendar.',
					filename: 'LimitedRange',
					module: LimitedRange,
					title: 'Limited Date Range'
				},
				{
					description: 'Demonstrates initializing month and year, and monitoring changes',
					filename: 'InitialMonthAndYear',
					module: InitialMonthAndYear,
					title: 'Initial month and year'
				},
				{
					description: 'Shows a fully controlled calendar',
					filename: 'FullyControlled',
					module: FullyControlledCalendar,
					title: 'Fully controlled'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicCalendar
				}
			}
		},
		card: {
			examples: [
				{
					title: 'Basic Card with Action Buttons',
					module: ActionButtons,
					filename: 'ActionButtons'
				},
				{
					title: 'Basic Card with Action Icons',
					module: ActionIcons,
					filename: 'ActionIcons'
				},
				{
					title: 'Basic Card with Actions and Icons',
					module: ActionButtonsAndIcons,
					filename: 'ActionButtonsAndIcons'
				},
				{
					title: 'Basic card with 16x9 Media',
					module: CardWithMediaRectangle,
					filename: 'CardWithMediaRectangle'
				},
				{
					title: 'Cards stream',
					module: Cards,
					filename: 'Cards'
				},
				{
					title: 'Basic card with Square Media',
					module: CardWithMediaSquare,
					filename: 'CardWithMediaSquare'
				},
				{
					title: 'Basic card with Content Media',
					module: CardWithMediaContent,
					filename: 'CardWithMediaContent'
				},
				{
					title: 'Card with header, content, media, and actions',
					module: CardCombined,
					filename: 'CardCombined'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicCard
				}
			}
		},
		'header-card': {
			examples: [
				{
					title: 'Basic HeaderCard with Action Buttons',
					module: ActionHeaderCard,
					filename: 'ActionHeaderCard'
				},
				{
					title: 'Header Card with media',
					module: MediaHeaderCard,
					filename: 'MediaHeaderCard'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicHeaderCard
				}
			}
		},
		chip: {
			examples: [
				{
					filename: 'Icon',
					module: ChipIcon,
					title: 'Icon'
				},
				{
					filename: 'Clickable',
					module: ChipClickable,
					title: 'Clickable'
				},
				{
					filename: 'Disabled',
					module: ChipDisabled,
					title: 'Disabled'
				},
				{
					filename: 'Closable',
					module: ChipClosable,
					title: 'Closable'
				},
				{
					filename: 'ClosableRenderer',
					module: ClosableRendererChip,
					title: 'Closable Renderer'
				},
				{
					filename: 'ClickableClosable',
					module: ChipClickableClosable,
					title: 'Clickable and Closable'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: ChipOverview
				}
			}
		},
		'constrained-input': {
			examples: [
				{
					filename: 'Username',
					module: Username,
					title: 'Username'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicConstrainedInput
				}
			}
		},
		'context-menu': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicContextMenu,
					sandbox: true,
					size: 'medium'
				}
			}
		},
		'date-input': {
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicDateInput,
					sandbox: true,
					size: 'large'
				}
			},
			examples: [
				{
					filename: 'Controlled',
					module: ControlledDateInput,
					sandbox: true,
					size: 'large',
					title: 'Controlled date input'
				}
			]
		},
		'context-popup': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicContextPopup,
					sandbox: true,
					size: 'medium'
				}
			}
		},
		dialog: {
			examples: [
				{
					filename: 'UnderlayDialog',
					module: UnderlayDialog,
					title: 'Dialog with and Underlay',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'ModalDialog',
					module: ModalDialog,
					title: 'Modal Dialog',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'CloseableDialog',
					module: CloseableDialog,
					title: 'Dialog with Configurable Closeability',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'AlertDialog',
					module: AlertDialog,
					title: 'Alert Dialog',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'AnimatedDialog',
					module: AnimatedDialog,
					title: 'Animated Dialog',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'FocusTrappedDialog',
					module: FocusTrappedDialog,
					title: 'Focus Trapping',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'ActionsDialog',
					module: ActionsDialog,
					title: 'Actions Dialog',
					sandbox: true,
					size: 'medium'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicDialog,
					sandbox: true,
					size: 'medium'
				}
			}
		},
		'email-input': {
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicEmailInput
				}
			}
		},
		form: {
			examples: [
				{
					title: 'Basic form with validation',
					module: ValidationForm,
					filename: 'Validation'
				},
				{
					title: 'Basic form with an initial value',
					module: InitialValueForm,
					filename: 'InitialValueForm'
				},
				{
					title: 'Basic controlled form',
					module: ControlledForm,
					filename: 'Controlled'
				},
				{
					title: 'Basic form with fill button',
					module: FillingForm,
					filename: 'FillingForm'
				},
				{
					title: 'Basic form with required fields',
					module: RequiredFieldsForm,
					filename: 'RequiredFieldsForm'
				},
				{
					title: 'Basic form with disabled fields',
					module: DisabledFieldsForm,
					filename: 'DisabledFieldsForm'
				},
				{
					title: 'Basic form with whole form disabling',
					module: DisabledForm,
					filename: 'DisabledForm'
				},
				{
					title: 'Basic form with reset button',
					module: ResettingForm,
					filename: 'ResettingForm'
				},
				{
					title: 'Basic form with onSubmit',
					module: SubmitForm,
					filename: 'SubmitForm'
				},
				{
					title: 'Form with all available options',
					module: KitchenSinkForm,
					filename: 'KitchenSinkForm'
				},
				{
					title: 'Action form with a name',
					module: ActionForm,
					filename: 'ActionForm'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicForm
				}
			}
		},
		'global-event': {
			filename: 'index',
			overview: {
				example: {
					module: BasicGlobalEvent,
					filename: 'Basic'
				}
			}
		},
		grid: {
			examples: [
				{
					filename: 'Sorting',
					module: Sorting,
					title: 'Grid with Sorting'
				},
				{
					filename: 'Filtering',
					module: Filtering,
					title: 'Grid with Filtered Columns'
				},
				{
					filename: 'CustomCellRenderer',
					module: CustomCellRenderer,
					title: 'Grid with Custom Cell Rendering'
				},
				{
					filename: 'CustomFilterRenderer',
					module: GridCustomFilterRenderer,
					title: 'Grid with Custom Filter Renderer'
				},
				{
					filename: 'CustomSortRenderer',
					module: CustomSortRenderer,
					title: 'Grid with Customized Sort Rendering'
				},
				{
					filename: 'ColumnResize',
					module: ColumnResize,
					title: 'Grid with resizable columns'
				},
				{
					filename: 'Paginated',
					module: Paginated,
					title: 'Grid with traditional pagination'
				},
				{
					filename: 'RowSelection',
					module: RowSelection,
					title: 'Grid with row selection'
				},
				{
					filename: 'Restful',
					module: Restful,
					title: 'Grid with Data Loaded from a Remote Resource (REST)'
				},
				{
					description: 'Demonstrates using the grid utilities to support editable cells',
					filename: 'EditableCells',
					module: EditableCells,
					title: 'Grid with Editable Cells'
				},
				{
					description:
						'Advanced grid demonstrating all features working together, including remote data, editable cells, pagination, filtering, resizable columns and sorting',
					filename: 'Advanced',
					module: Advanced,
					title: 'Advanced Grid'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicGrid
				}
			}
		},
		header: {
			examples: [
				{
					filename: 'Leading',
					module: LeadingHeader,
					title: 'With leading element'
				},
				{
					filename: 'Trailing',
					module: TrailingHeader,
					title: 'With trailing element'
				},
				{
					filename: 'Sticky',
					module: StickyHeader,
					sandbox: true,
					size: 'medium',
					title: 'With fixed positioning'
				}
			],
			filename: 'index',
			overview: {
				example: {
					module: BasicHeader,
					filename: 'Basic'
				}
			}
		},
		icon: {
			examples: [
				{
					filename: 'AltText',
					module: AltTextIcon,
					title: 'With alt text'
				},
				{
					filename: 'IconButton',
					module: IconButton,
					title: 'Icon within a button'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicIcons
				}
			}
		},
		label: {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicLabel,
					sandbox: true
				}
			},
			examples: [
				{
					filename: 'HiddenLabel',
					module: HiddenLabel,
					title: 'Hidden Label',
					sandbox: true
				},
				{
					filename: 'InvalidLabel',
					module: InvalidLabel,
					title: 'Invalid Label',
					sandbox: true
				},
				{
					filename: 'DisabledLabel',
					module: DisabledLabel,
					title: 'Disabled Label',
					sandbox: true
				},
				{
					filename: 'SecondaryLabel',
					module: SecondaryLabel,
					title: 'Secondary Label'
				}
			]
		},
		'loading-indicator': {
			filename: 'index',
			overview: {
				example: {
					module: BasicLoadingIndicator,
					filename: 'Basic'
				}
			}
		},
		list: {
			examples: [
				{
					description:
						'In this example, an activeIndex and onActiveIndexChange property are passed into the List allowing for the active list item to be controlled.',
					filename: 'Controlled',
					module: ControlledList,
					title: 'Controlled Active Index'
				},
				{
					filename: 'ItemRenderer',
					module: ItemRenderer,
					title: 'Item Renderer'
				},
				{
					description:
						'This example shows the menu used as a Listbox. This allows for a selection to be made and persisted. Useful for user selections and within selects / typeahead etc.',
					filename: 'Menu',
					module: Menu,
					title: 'Menu Mode'
				},
				{
					filename: 'FetchedResource',
					module: FetchedResource,
					title: 'Rest fetched resource'
				},
				{
					filename: 'CustomTransformer',
					module: CustomTransformer,
					title: 'Custom transform to match resource format'
				},
				{
					description:
						'This example shows usage of the divider property on a menu item to trigger the menu to render with a divider after that item',
					filename: 'Dividers',
					module: DividedList,
					title: 'Dividers'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicList
				}
			}
		},
		'native-select': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicNativeSelect
				}
			},
			examples: [
				{
					title: 'Contolled Native Select',
					filename: 'ControlledNativeSelect',
					module: ControlledNativeSelect
				}
			]
		},
		'password-input': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicPassword
				}
			},
			examples: [
				{
					title: 'No Rules',
					filename: 'NoRules',
					module: NoRules
				}
			]
		},
		'trigger-popup': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTriggerPopup,
					sandbox: true,
					size: 'medium'
				}
			},
			examples: [
				{
					title: 'Underlay',
					filename: 'Underlay',
					module: Underlay,
					sandbox: true,
					size: 'medium'
				},
				{
					title: 'Set Width',
					filename: 'SetWidth',
					module: SetWidth,
					sandbox: true,
					size: 'medium'
				},
				{
					title: 'Menu Popup',
					filename: 'MenuPopup',
					module: MenuTriggerPopup,
					sandbox: true,
					size: 'medium'
				}
			]
		},
		'multi-select-typeahead': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicMultiSelectTypeahead
				}
			},
			examples: [
				{
					title: 'Controlled',
					filename: 'Controlled',
					module: ControlledMultiSelectTypeahead
				},
				{
					title: 'Disabled',
					filename: 'Disabled',
					module: DisabledMultiSelectTypeahead
				},
				{
					title: 'Custom Renderer',
					filename: 'CustomRenderer',
					module: CustomRendererMultiSelectTypeahead
				},
				{
					title: 'Bottom Placement',
					filename: 'BottomPlacement',
					module: BottomMultiSelectTypeahead
				}
			]
		},
		'number-input': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicNumberInput
				}
			},
			examples: [
				{ title: 'Validation', filename: 'Validation', module: ValidatedNumberInput }
			]
		},
		pagination: {
			examples: [
				{
					filename: 'PageSizeSelector',
					module: PaginationPageSizeSelector,
					title: 'Page Size Selection'
				},
				{
					filename: 'Controlled',
					module: PaginationControlled,
					title: 'Fully Controlled'
				},
				{
					filename: 'SiblingCount',
					module: PaginationSiblingCount,
					title: 'Sibling Count'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: Pagination
				}
			}
		},

		progress: {
			examples: [
				{
					filename: 'Variants',
					module: ProgressVariants
				},
				{
					filename: 'Circular',
					module: ProgressCircular
				},
				{
					filename: 'ProgressWithTicks',
					module: ProgressTicks
				},
				{
					filename: 'ProgressWithRoundedEdges',
					module: ProgressRounded
				},
				{
					filename: 'ProgressWithChangingValues',
					module: ProgressWithChangingValues
				},
				{
					filename: 'ProgressWithMax',
					module: ProgressWithMax
				},
				{
					filename: 'ProgressWithCustomOutput',
					module: ProgressWithCustomOutput
				},
				{
					filename: 'ProgressWithoutOutput',
					module: ProgressWithoutOutput
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicProgress
				}
			}
		},
		radio: {
			overview: {
				example: {
					filename: 'Overview',
					module: RadioOverview
				}
			},
			examples: [
				{
					filename: 'Basic',
					module: RadioFlat,
					title: 'Flat (default)'
				},
				{
					filename: 'Filled',
					module: RadioFilled,
					title: 'Filled Radio'
				},
				{
					filename: 'Outlined',
					module: RadioOutlined,
					title: 'Outlined Radio'
				},
				{
					filename: 'Raised',
					module: RadioRaised,
					title: 'Raised Radio'
				},
				{
					filename: 'Shaped',
					module: RadioShaped,
					title: 'Shaped Radio'
				},
				{
					filename: 'Labelled',
					module: RadioLabelled,
					title: 'Labelled Radio Button'
				},
				{
					filename: 'Checked',
					module: RadioChecked,
					title: 'Checked Radio Button'
				},
				{
					filename: 'Disabled',
					module: RadioDisabled,
					title: 'Disabled Radio Button'
				},
				{
					filename: 'Events',
					module: RadioEvents,
					title: 'Radio Button Events'
				}
			]
		},
		'radio-group': {
			examples: [
				{
					filename: 'Controlled',
					module: ControlledRadioGroup,
					title: 'Controlled radio group'
				},
				{
					filename: 'InitialValue',
					module: InitialValueRadioGroup,
					title: 'Initial Value'
				},
				{
					filename: 'CustomLabel',
					module: CustomLabelRadioGroup,
					title: 'Custom Label'
				},
				{
					filename: 'CustomRenderer',
					module: CustomRendererRadioGroup,
					title: 'Custom Renderer'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: RadioBasicGroup
				}
			}
		},
		'range-slider': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicRangeSlider
				}
			},
			examples: [
				{ filename: 'Labelled', module: LabelledRangeSlider, title: 'Labelled' },
				{
					filename: 'MinMax',
					module: MinMaxRangeSlider,
					title: 'Minimum and Maximum Values'
				},
				{ filename: 'Events', module: EventsRangeSlider, title: 'Events' },
				{
					filename: 'Tooltip',
					module: TooltipRangeSlider,
					title: 'Display Tooltip Output'
				},
				{ filename: 'Required', module: RequiredRangeSlider, title: 'Required' },
				{ filename: 'Disabled', module: DisabledRangeSlider, title: 'Disabled' },
				{ filename: 'Controlled', module: ControlledRangeSlider, title: 'Controlled' }
			]
		},
		select: {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicSelect,
					sandbox: true,
					size: 'medium'
				}
			},
			examples: [
				{
					filename: 'Controlled',
					module: ControlledSelect,
					sandbox: true,
					title: 'Controlled Select',
					size: 'medium'
				},
				{
					filename: 'AdditionalText',
					module: AdditionalText,
					title: 'Additional Text',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'DisabledSelect',
					module: DisabledSelect,
					title: 'Disabled Select',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'RequiredSelect',
					module: RequiredSelect,
					title: 'Required Select',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'CustomRenderer',
					module: CustomRenderer,
					title: 'Custom Item Renderer',
					sandbox: true,
					size: 'medium'
				}
			]
		},
		'slide-pane': {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicSlidePane,
					sandbox: true,
					size: 'medium'
				}
			},
			examples: [
				{
					filename: 'RightAlignSlidePane',
					module: RightAlignSlidePane,
					title: 'Right Aligned Slide Pane',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'LeftAlignSlidePane',
					module: LeftAlignSlidePane,
					title: 'Left Aligned Slide Pane',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'BottomAlignSlidePane',
					module: BottomAlignSlidePane,
					title: 'Bottom Aligned Slide Pane',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'UnderlaySlidePane',
					module: UnderlaySlidePane,
					title: 'Underlaid Slide Pane',
					sandbox: true,
					size: 'medium'
				},
				{
					filename: 'FixedWidthSlidePane',
					module: FixedWidthSlidePane,
					title: 'Fixed Width Slide Pane',
					sandbox: true,
					size: 'medium'
				}
			]
		},
		slider: {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicSlider
				}
			},
			examples: [
				{
					filename: 'Variants',
					module: SliderVariants
				},
				{
					filename: 'SliderWithTicks',
					module: SliderWithTicks
				},
				{
					filename: 'SliderWithCustomOutput',
					module: SliderWithCustomOutput
				},
				{
					filename: 'SliderDisabled',
					module: SliderDisabled
				},
				{
					filename: 'SliderVertical',
					module: SliderVertical
				},
				{
					filename: 'SliderWithNoOutput',
					module: SliderWithNoOutput
				},
				{
					filename: 'SliderWithValidityCheck',
					module: SliderWithValidityCheck
				},
				{
					filename: 'Controlled',
					module: SliderControlled
				}
			]
		},
		snackbar: {
			overview: {
				example: {
					filename: 'Basic',
					module: BasicSnackbar,
					sandbox: true,
					size: 'small'
				}
			},
			examples: [
				{
					filename: 'Error',
					module: ErrorSnackbar,
					title: 'Error Snackbar',
					sandbox: true,
					size: 'small'
				},
				{
					filename: 'Success',
					module: SuccessSnackbar,
					title: 'Success Snackbar',
					sandbox: true,
					size: 'small'
				},
				{
					filename: 'Stacked',
					module: StackedSnackbar,
					title: 'Stacked Snackbar',
					sandbox: true,
					size: 'small'
				},
				{
					filename: 'Leading',
					module: LeadingSnackbar,
					title: 'Leading Snackbar',
					sandbox: true,
					size: 'small'
				}
			]
		},
		switch: {
			overview: {
				example: {
					filename: 'Overview',
					module: SwitchOverview
				}
			},
			examples: [
				{
					filename: 'Flat',
					module: SwitchFlat,
					title: 'Outlined Switch'
				},
				{
					filename: 'Filled',
					module: SwitchFilled,
					title: 'Filled Switch'
				},
				{
					filename: 'Outlined',
					module: SwitchOutlined,
					title: 'Outlined Switch'
				},
				{
					filename: 'Raised',
					module: SwitchRaised,
					title: 'Raised Switch'
				},
				{
					filename: 'Shaped',
					module: SwitchShaped,
					title: 'Shaped Switch'
				},
				{
					filename: 'Disabled',
					module: SwitchDisabled,
					title: 'Disabled'
				},
			]
		},
		'tab-controller': {
			examples: [
				{
					filename: 'Controlled',
					module: ControlledTabController,
					title: 'Controlled TabController'
				},
				{
					filename: 'Disabled',
					module: DisabledTabController,
					title: 'TabController with disabled tabs'
				},
				{
					filename: 'ButtonAlignment',
					module: ButtonAlignmentTabController,
					title: 'TabController with adjustable button alignment'
				},
				{
					filename: 'Closeable',
					module: CloseableTabController,
					title: 'TabController with closeable tab'
				}
			],
			filename: 'index',
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTabController
				}
			}
		},
		'text-area': {
			examples: [
				{
					filename: 'Controlled',
					module: TextAreaControlled,
					title: 'Controlled text area'
				},
				{
					filename: 'Label',
					module: TextAreaWithLabel,
					title: 'Textarea with label'
				},
				{
					filename: 'Disabled',
					module: TextAreaDisabled,
					title: 'Disabled'
				},
				{
					filename: 'HelperText',
					module: TextAreaHelper,
					title: 'Helper text'
				},
				{
					filename: 'HiddenLabel',
					module: TextAreaHiddenLabel,
					title: 'Hidden label'
				},
				{
					filename: 'ValidatedCustom',
					module: ValidatedCustomTextArea,
					title: 'Validated with custom validator'
				},
				{
					filename: 'ValidatedRequired',
					module: ValidatedRequiredTextArea,
					title: 'Validated required'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: TextAreaOverview
				}
			}
		},
		'text-input': {
			overview: {
				example: {
					filename: 'Overview',
					module: TextInputOverview
				}
			},
			examples: [
				{
					filename: 'Flat',
					module: TextInputFlat,
					title: 'Flat Text Input'
				},
				{
					filename: 'Filled',
					module: TextInputFilled,
					title: 'Filled Text Input'
				},
				{
					filename: 'Outlined',
					module: TextInputOutlined,
					title: 'Outlined Text Input'
				},
				{
					filename: 'Raised',
					module: TextInputRaised,
					title: 'Raised Text Input'
				},
				{
					filename: 'Shaped',
					module: TextInputShaped,
					title: 'Shaped Text Input'
				},
				{
					filename: 'WithLabel',
					module: TextInputWithLabel,
					title: 'TextInput with Label'
				},
				{
					filename: 'HiddenLabel',
					module: TextInputHiddenLabel,
					title: 'TextInput with hidden label'
				},
				{
					filename: 'Placeholder',
					module: TextInputPlaceholder,
					title: 'TextInput with placeholder and no label'
				},
				{
					filename: 'Controlled',
					module: TextInputControlled,
					title: 'Controlled TextInput'
				},
				{
					filename: 'Disabled',
					module: TextInputDisabled,
					title: 'Disabled TextInput'
				},
				{
					filename: 'Validated',
					module: TextInputValidated,
					title: 'Validated TextInput'
				},
				{
					filename: 'HelperText',
					module: TextInputHelper,
					title: 'TextInput with helper text'
				},
				{
					filename: 'LeadingTrailing',
					module: TextInputLeadingTrailing,
					title: 'TextInput with leading and trailing'
				}
			],
			filename: 'index'
		},
		'three-column-layout': {
			overview: {
				example: {
					filename: 'BasicThreeColumnLayout',
					module: BasicThreeColumnLayout
				}
			}
		},
		'time-picker': {
			examples: [
				{
					filename: 'Controlled',
					module: ControlledTimePicker,
					title: 'Controlled time picker'
				},
				{
					filename: 'DisabledMenuItems',
					module: DisabledMenuItemsTimePicker,
					title: 'Disabled menu items'
				},
				{
					filename: 'Disabled',
					module: DisabledTimePicker,
					title: 'Disabled time picker'
				},
				{
					filename: 'SelectBySecond',
					module: SelectBySecondTimePicker,
					title: 'Select time by the second'
				},
				{
					filename: '12HourTime',
					module: TwelveHourTimePicker,
					title: '12 hour time'
				},
				{
					filename: 'Required',
					module: RequiredTimePicker,
					title: 'Required time picker'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTimePicker
				}
			}
		},
		'title-pane': {
			examples: [
				{
					filename: 'AriaHeadingLevel',
					module: HeadingLevel,
					title: 'Defined aria heading level'
				},
				{
					filename: 'NonCloseable',
					module: NonCloseable,
					title: 'Non closeable'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTitlePane
				}
			}
		},
		tooltip: {
			examples: [
				{
					filename: 'Focus',
					module: FocusTooltip,
					title: 'Show on focus'
				},
				{
					filename: 'Click',
					module: ClickTooltip,
					title: 'Show on click'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTooltip
				}
			}
		},
		'two-column-layout': {
			examples: [
				{
					filename: 'TrailingBias',
					module: TrailingBiasTwoColumnLayout,
					title: 'Trailing section bias'
				},
				{
					filename: 'Collapsing',
					module: CollapsingLayout,
					title: 'Collapsing columns'
				}
			],
			overview: {
				example: {
					filename: 'Basic',
					module: BasicTwoColumnLayout
				}
			}
		},
		typeahead: {
			examples: [
				{
					filename: 'Remote',
					module: RemoteTypeahead,
					title: 'Remote Source'
				},
				{
					filename: 'Validation',
					module: ValidatedTypeahead,
					title: 'Validation'
				}
			],
			overview: {
				example: {
					filename: 'Typeahead',
					module: BasicTypeahead
				}
			}
		}
	}
};
export default config;
