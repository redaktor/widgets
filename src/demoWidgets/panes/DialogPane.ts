import { v, w } from '@dojo/framework/core/vdom';
import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import Button from '../../widgets/button';
import Dialog from '../../widgets/dialog';

export default class DialogPane extends WidgetBase {
	private _dialogOpen = false;

	private _buttonClick() {
		this._dialogOpen = !this._dialogOpen;
		console.log('_buttonClick', this._dialogOpen)
		this.invalidate();
	}

	render() {
		return v('div', [
			w(Button, {
				pressed: this._dialogOpen,
				onClick: this._buttonClick
			}, [ 'Show a Dialog' ]),
			v('p', [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu, in vestibulum neque nulla a felis. Aenean non dapibus nibh. Suspendisse sed tellus eu erat congue sollicitudin in nec lorem. Vestibulum ut mauris orci. Pellentesque congue neque et egestas pulvinar. Fusce bibendum mollis iaculis. Suspendisse quis dui in mi ultricies faucibus et quis risus. Fusce id viverra orci. Aliquam erat volutpat. Morbi lobortis, justo vel convallis laoreet, neque tellus tempus arcu, ac rutrum lacus ligula vel ligula. Cras a pulvinar erat. Cras tempor commodo pellentesque. Morbi vel tortor sit amet enim malesuada feugiat. Etiam justo turpis, pharetra a pulvinar semper, faucibus at ligula.<br>Mauris in ultrices neque, vitae luctus mauris. Integer justo nibh, lacinia quis luctus a, placerat vitae enim. Integer eu turpis semper, sagittis purus nec, bibendum nulla. Donec mollis at odio vehicula ullamcorper. Nullam consequat mattis mauris, a consequat tortor tempor tincidunt. Mauris laoreet laoreet magna. Morbi lectus nunc, euismod id dapibus vitae, ullamcorper volutpat massa. Praesent dui est, auctor eget sem at, dignissim venenatis quam. Quisque a justo nunc. Proin venenatis eros augue.`,
				v('br'),v('br'),
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Quisque id purus ipsum. Aenean ac purus purus.
				Nam sollicitudin varius augue, sed lacinia felis tempor in.`,
				v('br'),v('br'),
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta at mi a tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec malesuada, dui sit amet pretium congue, sem ligula sollicitudin arcu, in vestibulum neque nulla a felis. Aenean non dapibus nibh. Suspendisse sed tellus eu erat congue sollicitudin in nec lorem. Vestibulum ut mauris orci. Pellentesque congue neque et egestas pulvinar. Fusce bibendum mollis iaculis. Suspendisse quis dui in mi ultricies faucibus et quis risus. Fusce id viverra orci. Aliquam erat volutpat. Morbi lobortis, justo vel convallis laoreet, neque tellus tempus arcu, ac rutrum lacus ligula vel ligula. Cras a pulvinar erat. Cras tempor commodo pellentesque. Morbi vel tortor sit amet enim malesuada feugiat. Etiam justo turpis, pharetra a pulvinar semper, faucibus at ligula.<br>Mauris in ultrices neque, vitae luctus mauris. Integer justo nibh, lacinia quis luctus a, placerat vitae enim. Integer eu turpis semper, sagittis purus nec, bibendum nulla. Donec mollis at odio vehicula ullamcorper. Nullam consequat mattis mauris, a consequat tortor tempor tincidunt. Mauris laoreet laoreet magna. Morbi lectus nunc, euismod id dapibus vitae, ullamcorper volutpat massa. Praesent dui est, auctor eget sem at, dignissim venenatis quam. Quisque a justo nunc. Proin venenatis eros augue.`
      ]),
			w(Dialog, {
				title: 'Dialog',
				open: this._dialogOpen,
				modal: true,
				underlay: true,
				closeable: true,
				onRequestClose: () => {
					this._dialogOpen = false;
					this.invalidate();
				}
			}, [
				`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Quisque id purus ipsum. Aenean ac purus purus.
				Nam sollicitudin varius augue, sed lacinia felis tempor in.`
			])
		]);
	}
}
