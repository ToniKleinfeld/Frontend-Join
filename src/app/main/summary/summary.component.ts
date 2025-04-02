import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss', './summary-mobile.component.scss'],
})
export class SummaryComponent implements OnInit {
  showAnimation = false;
  isMobile: boolean = window.innerWidth < 920;
  isLandscape:boolean = window.innerHeight < 601;

  ngOnInit() {
    this.checkScreenSize();
    this.checkWelcomeAnimation();
  }

  summaryTasks = [
    { task: 'Tasks Urgent', imgpath: 'urgent', class: 'largeBox' },
    { task: 'Tasks in Board', imgpath: 'taskcount', class: 'smallBox' },
    { task: 'Tasks To-do', imgpath: 'todo', class: 'smallBox toDo' },
    {
      task: 'Tasks in Progress',
      imgpath: 'progresstasks',
      class: 'smallBox',
    },
    { task: 'Awaiting Feedback', imgpath: 'feedback', class: 'smallBox' },
    { task: 'Tasks Done', imgpath: 'taskdone', class: 'smallBox' },
  ];

  /**
   * Watch for window size change under 1024px, call funktion to swap array.object positions
   */
  @HostListener('window:resize', [])
  onResize() {
    const newIsMobile = window.innerWidth < 920;
    const newIsLandscape = window.innerHeight < 601;

    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.swapTasks(1, 2);
    }

    this.isLandscape = newIsLandscape;
  }

  /**
   * oninit check if Animation still played
   */
  checkWelcomeAnimation(){
    const animationShown = sessionStorage.getItem('animationShown');
    if (!animationShown) {
      this.showAnimation = true;
      setTimeout(() => {
        sessionStorage.setItem('animationShown', 'true');
      }, 2000);
    }
  }

  /**
   * Check on loading if screen-size under 920px , yes -> call swap-tasks
   */
  checkScreenSize() {
    if (window.innerWidth < 920) {
      this.swapTasks(1, 2);
    }
  }

  /**
   * Swap the position of object in the Array for mobile version
   *
   * @param index1
   * @param index2
   */
  swapTasks(index1: number, index2: number) {
    if (
      index1 >= 0 &&
      index1 < this.summaryTasks.length &&
      index2 >= 0 &&
      index2 < this.summaryTasks.length
    ) {
      [this.summaryTasks[index1], this.summaryTasks[index2]] = [
        this.summaryTasks[index2],
        this.summaryTasks[index1],
      ];
    }
  }
}
