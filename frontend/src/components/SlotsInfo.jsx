import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Slotsinfo extends Component {
    constructor(props) {
        super(props);

        const current = new Date();
        let day_idx = current.getDay();
        let dt = ['', ''];
        let day = ['', ''];

        let next = new Date();
        next.setDate(current.getDate() + 1);

        if (0 === day_idx) {
            dt[0] = this.ddMmYyyy(next);
            day[0] = 'Monday';

            next.setDate(next.getDate() + 1);
            dt[1] = this.ddMmYyyy(next);
            day[1] = 'Tuesday';
        } else if (6 === day_idx) {
            dt[0] = this.ddMmYyyy(current);
            day[0] = 'Saturday';

            next.setDate(next.getDate() + 1);
            dt[1] = this.ddMmYyyy(next);
            day[1] = 'Monday';
        } else {
            dt[0] = this.ddMmYyyy(current);
            day[0] = current.toLocaleDateString('en-GB', { weekday: "long" });

            dt[1] = this.ddMmYyyy(next);
            day[1] = next.toLocaleDateString('en-GB', { weekday: "long" });
        }

        this.state = {
            isLoaded: false,
            date: dt,
            day: day,
            slots: [[], []]
        }
    }

    ddMmYyyy = (today) => {
        let dd = today.getDate();
        let mm = today.getMonth() + 1;

        let yyyy = today.getFullYear();

        let ans = '';
        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }
        ans = dd + '-' + mm + '-' + yyyy;
        return ans;
    }

    componentDidMount = () => {
        let promises = [];
        let slots = [
            [
                { startTime: "09:00 AM", isAvl: false },
                { startTime: "10:00 AM", isAvl: false },
                { startTime: "11:00 AM", isAvl: false },
                { startTime: "12:00 PM", isAvl: false },
                { startTime: "04:00 PM", isAvl: false },
                { startTime: "05:00 PM", isAvl: false },
                { startTime: "06:00 PM", isAvl: false },
                { startTime: "07:00 PM", isAvl: false }
            ],
            [
                { startTime: "09:00 AM", isAvl: false },
                { startTime: "10:00 AM", isAvl: false },
                { startTime: "11:00 AM", isAvl: false },
                { startTime: "12:00 PM", isAvl: false },
                { startTime: "04:00 PM", isAvl: false },
                { startTime: "05:00 PM", isAvl: false },
                { startTime: "06:00 PM", isAvl: false },
                { startTime: "07:00 PM", isAvl: false }
            ]
        ];

        for (let d = 0; d < 2; d++) {
            for (let s = 0; s < 8; s++) {
                promises.push(fetch(`/api/bookings/${this.props.doctorId}?date=${this.state.date[d]}&slot=${s}`)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        if (result === null)
                            slots[d][s].isAvl = true;
                    })
                )
            }
        }

        Promise.all(promises)
            .then(() => this.setState({ slots: slots, isLoaded: true }));
    }

    render() {
        let avail1 = [];
        let avail2 = [];
        if (this.state.isLoaded) {
            avail1 = this.state.slots[0].filter(s => s.isAvl);
            avail2 = this.state.slots[1].filter(s => s.isAvl);
        }

        return (
            <div className="appointment">
                {this.state.isLoaded === false ?
                    <div className="loading">Loading Available slots...</div> :
                    <div className="slots-info">
                        <div className="day-info">
                            <div className="date-day">{this.state.date[0]} {this.state.day[0]}</div>
                            <div className="slots">{
                                0 === avail1.length ?
                                    <div className="loading">No slots available</div> :
                                    avail1.map((s, index) =>
                                        <Link to="./" className="slot" key={index}>
                                            {s.startTime}
                                        </Link>)
                            }
                            </div>
                        </div>

                        <div className="day-info">
                            <div className="date-day">{this.state.date[1]} {this.state.day[1]}</div>
                            <div className="slots">{
                                0 === avail2.length ?
                                    <div className="loading">No slots available</div> :
                                    avail2.map((s, index) =>
                                        <Link to="./" className="slot" key={index}>
                                            {s.startTime}
                                        </Link>)
                            }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Slotsinfo;