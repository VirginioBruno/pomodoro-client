import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly initialSeconds = 1500;
  formattedTimer = "";
  interval: number | undefined;
  buttonText = "Start!";
  timer = this.initialSeconds;

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
    this.timer = this.initialSeconds;
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
      new Notification("Pomodoro Session", {
        body: "Congratulations! Your pomodoro has finished.",
        icon: "/assets/logo.png", // Replace with your own icon URL
      });
    }
  }
}
