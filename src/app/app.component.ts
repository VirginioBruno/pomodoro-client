import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly pomodoroSeconds = 1500;
  readonly breakSeconds = 300;
  isPomodoroTab = true;
  formattedTimer = "";
  theme = "pomodoro";
  interval: number | undefined;
  buttonText = "Start!";
  timer = this.pomodoroSeconds;

  ngOnInit(): void {
    this.updateFormattedTimer();
  }

  togglePomodoro() {
    if (this.interval)
      this.stopTimer();
    else
      this.startTimer();
  }

  private stopTimer() {
    this.buttonText = "Start!";
    clearInterval(this.interval);
    this.interval = undefined;
  }

  private startTimer() {
    this.requestNotificationPermission();
    this.buttonText = "Stop";
    this.interval = setInterval(() => {
      if (this.timer == 0) {
        this.resetTimer();
        this.showNotification();
        return;
      }

      this.timer--;
      this.updateFormattedTimer();
    }, 1000)
  }

  resetTimer() {
    this.buttonText = "Start!";
    this.timer = this.isPomodoroTab ? this.pomodoroSeconds : this.breakSeconds;
    this.updateFormattedTimer();
    clearInterval(this.interval);
    this.interval = undefined;
  }

  updateFormattedTimer() {
      let minutes = Math.floor(this.timer / 60);
      let seconds = this.timer % 60;
      this.formattedTimer = `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
      return num < 10 ? '0' + num : '' + num;
  }

  requestNotificationPermission() {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }

  showNotification() {
    if (Notification.permission === "granted") {
      let bodyMessage = this.isPomodoroTab ? "Congratulations! Your pomodoro has finished."
        : "Your break time is over, it's time to go back to work!";

      new Notification("Pomodoro Session", {
        body: bodyMessage,
        icon: "/assets/logo.png", // Replace with your own icon URL
      });
    }
  }

  setPomodoro() {
    if (this.isPomodoroTab) return;
    clearInterval(this.interval);
    this.interval = undefined;
    this.buttonText = "Start!";
    this.theme = "pomodoro";
    this.timer = this.pomodoroSeconds;
    this.updateFormattedTimer();
    this.isPomodoroTab = true;
  }

  setBreak() {
    if(!this.isPomodoroTab) return;
    clearInterval(this.interval);
    this.interval = undefined;
    this.buttonText = "Start!";
    this.theme = "break";
    this.timer = this.breakSeconds;
    this.updateFormattedTimer();
    this.isPomodoroTab = false;
  }
}
