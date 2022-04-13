import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

    private subscription: Subscription = new Subscription();
  
    public dateNow = new Date();
    public dDay = new Date('Apr 16 2022 00:00:00');
    public milliSecondsInASecond = 1000;
    public hoursInADay = 24;
    public minutesInAnHour = 60;
    public SecondsInAMinute  = 60;

    public timeDifference:number = 0;
    public secondsToDday:number = 0;
    public minutesToDday: number = 0;
    public hoursToDday: number = 0;
    public daysToDday: number = 0;


    private getTimeDifference (): void {
        this.timeDifference = this.dDay.getTime() - new  Date().getTime();
        this.allocateTimeUnits(this.timeDifference);
    }

  private allocateTimeUnits (timeDifference: number): void {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }

    ngOnInit() {
      this.playAudio();
       this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifference(); });
    }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }

   playAudio(): void{
    let audio = new Audio();
    audio.src = "../../assets/money.mp3";
    audio.load();
    audio.play();
  }

}