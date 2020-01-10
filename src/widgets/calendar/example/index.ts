import { WidgetBase } from '@dojo/framework/core/WidgetBase';
import { WidgetProperties } from '@dojo/framework/core/interfaces';
import { ProjectorMixin } from '@dojo/framework/core/mixins/Projector';
import { v, w } from '@dojo/framework/core/d';
import Calendar from '../../calendar/index';

export class App extends WidgetBase<WidgetProperties> {
	private _month: number;
	private _year: number;
	private _selectedDate: Date;

	render() {
		return v('div', {}, [
			w(Calendar, {
				month: this._month,
				selectedDate: this._selectedDate,
				year: this._year,
				onMonthChange: (month: number) => {
					this._month = month;
					this.invalidate();
				},
				onYearChange: (year: number) => {
					this._year = year;
					this.invalidate();
				},
				onDateSelect: (date: Date) => {
					this._selectedDate = date;
					this.invalidate();
				}
			}),
			this._selectedDate ? v('p', [ `Selected Date: ${this._selectedDate.toDateString()}` ]) : null
		]);
	}
}

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append();
