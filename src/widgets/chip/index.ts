import { theme, customElement } from '../common/Widget';
import { Keys, keyName } from '../common/util';
import { CustomElementChildType } from '@dojo/framework/core/registerCustomElement';
import ClickBase, { ClickProperties } from '../baseClick';
import * as css from '../themes/redaktor-default/chip.m.css';

/**
 * @type ChipProperties
 *
 * Properties that can be set on a Chip component
 *
 * @property disabled
 */
export interface ChipProperties extends ClickProperties {
	onDelete?(evt?: Event): void;
}

@theme(css)
@customElement<ChipProperties>({
	tag: 'redaktor-chip',
	childType: CustomElementChildType.TEXT,
	attributes: [ 'id', 'name', 'value' ],
	properties: [
		'disabled', 'size', 'depth', 'schema', 'pressed', 'popup', 'theme', 'aria', 'extraClasses'
	],
	events: [
		'onBlur', 'onChange', 'onClick', 'onFocus', 'onMouseDown', 'onMouseUp',
		'onTouchCancel', 'onTouchEnd', 'onTouchStart'
	]
})
export default class Chip extends ClickBase<ChipProperties> {
	protected chipRef: HTMLElement;

  protected onDeleteIconClick(event: Event) {
    // Stop the event from bubbling up to the `Chip`
    event.stopPropagation();
    const { onDelete } = this.properties;
    if (onDelete) {
      onDelete(event);
    }
  };

  protected onKeyDown(event: KeyboardEvent) {
    // Ignore events from children of `Chip`.
    if (event.currentTarget !== event.target) { return }
    const { onClick, onDelete, onKeyDown } = this.properties;
    const key = keyName(event);
    if (onClick && (key === ' ' || key === 'Enter')) {
      event.preventDefault();
      onClick(new MouseEvent(''));
    } else if (onDelete && key === 'Backspace') {
      event.preventDefault();
      onDelete(event);
    } else if (key === 'Escape') {
      event.preventDefault();
      if (this.chipRef) {
        this.chipRef.blur();
      }
    }
    if (onKeyDown) {
      this._onKeyDown(event);
    }
  }

/*
render() {
	const {
		avatar: avatarProp,
		classes,
		className: classNameProp,
		clickable,
		component: Component,
		deleteIcon: deleteIconProp,
		label,
		onClick,
		onDelete,
		onKeyDown,
		tabIndex: tabIndexProp,
		...other
	} = this.properties;

	const className = classNames(
		classes.root,
		{ [classes.clickable]: onClick || clickable },
		{ [classes.deletable]: onDelete },
		classNameProp,
	);

	let deleteIcon = null;
	if (onDelete) {
		deleteIcon =
			deleteIconProp && React.isValidElement(deleteIconProp) ? (
				React.cloneElement(deleteIconProp, {
					className: classNames(deleteIconProp.properties.className, classes.deleteIcon),
					onClick: this.onDeleteIconClick,
				})
			) : (
				<CancelIcon className={classes.deleteIcon} onClick={this.onDeleteIconClick} />
			);
	}

	let avatar = null;
	if (avatarProp && React.isValidElement(avatarProp)) {
		avatar = React.cloneElement(avatarProp, {
			className: classNames(classes.avatar, avatarProp.properties.className),
			childrenClassName: classNames(classes.avatarChildren, avatarProp.properties.childrenClassName),
		});
	}

	let tabIndex = tabIndexProp;

	if (!tabIndex) {
		tabIndex = onClick || onDelete || clickable ? 0 : -1;
	}

	return (
		<Component
			role="button"
			className={className}
			tabIndex={tabIndex}
			onClick={onClick}
			onKeyDown={this.onKeyDown}
			ref={node => {
				this.chipRef = node;
			}}
			{...other}
		>
			{avatar}
			<span className={classes.label}>{label}</span>
			{deleteIcon}
		</Component>
	);
}
}
*/
}
