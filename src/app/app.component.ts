import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly initialSeconds = 1500 * 1000;
  formattedTimer = "";
  interval: any;
  buttonText = 'Start!';
  timer = new Date(this.initialSeconds);

  ngOnInit(): void {
    this.updateFormattedTimer(this.timer);
  }

  togglePomodoro() {
    if (this.interval === undefined) {
      this.buttonText = "Stop";
      this.interval = setInterval(() => {
        let minutes = this.timer.getMinutes();
        let seconds = this.timer.getSeconds();

        if(minutes == 0 && seconds == 0) {
          this.resetTimer();
          alert("Congratulations! Your pomodoro session has finished!");
          return;
        }

        this.timer.setSeconds(seconds - 1);
        this.updateFormattedTimer(this.timer);
      }, 1000)
    }
    else {
      this.buttonText = "Start!";
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  resetTimer() {
    this.buttonText = "Start!";
    this.timer = new Date(this.initialSeconds);
    this.updateFormattedTimer(this.timer);
    clearInterval(this.interval);
    this.interval = undefined;
  }

  updateFormattedTimer(timer: Date) {
    let minutes = timer.getMinutes() < 10 ? "0" + timer.getMinutes() : timer.getMinutes();
    let seconds = timer.getSeconds() < 10 ? "0" + timer.getSeconds() : timer.getSeconds();

    this.formattedTimer = `${minutes}:${seconds}`;
  }
}
