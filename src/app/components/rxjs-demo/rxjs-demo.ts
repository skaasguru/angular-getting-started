import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  of,
  interval,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  combineLatest,
  merge,
  zip,
  forkJoin,
  map,
  switchMap,
  mergeMap,
  concatMap,
  filter,
  take,
  debounceTime,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-rxjs-demo',
  imports: [CommonModule],
  templateUrl: './rxjs-demo.html',
  styleUrl: './rxjs-demo.css',
})
export class RxjsDemo implements OnInit, OnDestroy {
  private subs = new Subscription();

  // Transformation
  mapInput = signal<number[]>([]);
  mapOutput = signal<string[]>([]);
  switchMapClicks = signal(0);
  switchMapOutput = signal<string[]>([]);
  mergeMapClicks = signal(0);
  mergeMapOutput = signal<string[]>([]);
  concatMapClicks = signal(0);
  concatMapOutput = signal<string[]>([]);

  // Filtering
  filterInput = signal<number[]>([]);
  filterOutput = signal<number[]>([]);
  takeOutput = signal<string[]>([]);
  debounceInput = signal<string>('');
  debounceOutput = signal<string>('');
  distinctInput = signal<string[]>([]);
  distinctOutput = signal<string[]>([]);

  // Combination
  combineA = signal(0);
  combineB = signal(0);
  combineOutput = signal<string[]>([]);
  mergeOutput = signal<string[]>([]);
  zipOutput = signal<string[]>([]);
  forkJoinOutput = signal<string>('');

  // Subjects
  behaviorCurrent = signal<number | null>(null);
  behaviorLog = signal<string[]>([]);
  replayLog = signal<string[]>([]);
  asyncLog = signal<string[]>([]);
  asyncFinal = signal<string | null>(null);

  // Chaining
  chainOutput = signal<string[]>([]);

  private searchSubject = new Subject<string>();
  private distinctSubject = new Subject<string>();
  private behaviorSubject = new BehaviorSubject<number>(0);
  private replaySubject = new ReplaySubject<number>(3);
  private asyncSubject = new AsyncSubject<string>();

  private switchMapClick$ = new Subject<number>();
  private mergeMapClick$ = new Subject<number>();
  private concatMapClick$ = new Subject<number>();

  ngOnInit(): void {
    this.setupDebounce();
    this.setupDistinct();
    this.setupBehaviorSubject();
    this.setupReplaySubject();
    this.setupAsyncSubject();
    this.setupOperatorChaining();
    this.setupSwitchMap();
    this.setupMergeMap();
    this.setupConcatMap();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // --- Transformation: map ---
  runMap(): void {
    const source = of(1, 2, 3, 4, 5);
    const result: string[] = [];
    source.pipe(map((x) => `#${x * 10}`)).subscribe({
      next: (v) => result.push(v),
      complete: () => {
        this.mapInput.set([1, 2, 3, 4, 5]);
        this.mapOutput.set(result);
      },
    });
  }

  private setupSwitchMap(): void {
    this.subs.add(
      this.switchMapClick$.pipe(
        switchMap((id) =>
          interval(500).pipe(
            take(3),
            map((i) => `Click ${id}-${i + 1}`)
          )
        )
      ).subscribe({
        next: (v) => this.switchMapOutput.update((prev) => [...prev, v]),
      })
    );
  }

  runSwitchMap(): void {
    this.switchMapClicks.update((c) => c + 1);
    this.switchMapClick$.next(this.switchMapClicks());
  }

  clearSwitchMap(): void {
    this.switchMapOutput.set([]);
  }

  private setupMergeMap(): void {
    this.subs.add(
      this.mergeMapClick$.pipe(
        mergeMap((id) =>
          interval(400).pipe(
            take(3),
            map((i) => `Req ${id}-${i + 1}`)
          )
        )
      ).subscribe({
        next: (v) => this.mergeMapOutput.update((prev) => [...prev, v]),
      })
    );
  }

  runMergeMap(): void {
    this.mergeMapClicks.update((c) => c + 1);
    this.mergeMapClick$.next(this.mergeMapClicks());
  }

  clearMergeMap(): void {
    this.mergeMapOutput.set([]);
  }

  private setupConcatMap(): void {
    this.subs.add(
      this.concatMapClick$.pipe(
        concatMap((id) =>
          interval(350).pipe(
            take(3),
            map((i) => `Seq ${id}-${i + 1}`)
          )
        )
      ).subscribe({
        next: (v) => this.concatMapOutput.update((prev) => [...prev, v]),
      })
    );
  }

  runConcatMap(): void {
    this.concatMapClicks.update((c) => c + 1);
    this.concatMapClick$.next(this.concatMapClicks());
  }

  clearConcatMap(): void {
    this.concatMapOutput.set([]);
  }

  // --- Filtering: filter ---
  runFilter(): void {
    const source = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const result: number[] = [];
    source.pipe(filter((x) => x % 2 === 0)).subscribe({
      next: (v) => result.push(v),
      complete: () => {
        this.filterInput.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.filterOutput.set(result);
      },
    });
  }

  // --- Filtering: take ---
  runTake(): void {
    const result: string[] = [];
    interval(200)
      .pipe(
        take(5),
        map((i) => `Emit ${i + 1}`)
      )
      .subscribe({
        next: (v) => result.push(v),
        complete: () => this.takeOutput.set(result),
      });
  }

  private setupDebounce(): void {
    this.subs.add(
      this.searchSubject.pipe(debounceTime(400)).subscribe((v) => this.debounceOutput.set(v))
    );
  }

  onDebounceInput(value: string): void {
    this.debounceInput.set(value);
    this.searchSubject.next(value);
  }

  private setupDistinct(): void {
    this.subs.add(
      this.distinctSubject.pipe(distinctUntilChanged()).subscribe((v) => {
        this.distinctOutput.update((prev) => [...prev, v]);
      })
    );
  }

  onDistinctEmit(value: string): void {
    this.distinctInput.update((prev) => [...prev, value]);
    this.distinctSubject.next(value);
  }

  resetDistinct(): void {
    this.distinctInput.set([]);
    this.distinctOutput.set([]);
  }

  // --- Combination: combineLatest (live with two sources) ---
  private combineA$ = new BehaviorSubject(1);
  private combineB$ = new BehaviorSubject(10);

  runCombineLatest(): void {
    const result: string[] = [];
    combineLatest([this.combineA$, this.combineB$])
      .pipe(take(5))
      .subscribe({
        next: ([x, y]) => {
          result.push(`a=${x}, b=${y} → sum=${x + y}`);
          if (result.length === 1) this.combineB$.next(20);
          else if (result.length === 2) this.combineA$.next(2);
          else if (result.length === 3) this.combineB$.next(30);
          else if (result.length === 4) this.combineA$.next(3);
        },
        complete: () => this.combineOutput.set(result),
      });
  }

  // --- Combination: merge ---
  runMerge(): void {
    const result: string[] = [];
    const a = interval(200).pipe(take(3), map((i) => `A${i + 1}`));
    const b = interval(300).pipe(take(3), map((i) => `B${i + 1}`));
    merge(a, b).subscribe({
      next: (v) => result.push(v),
      complete: () => this.mergeOutput.set(result),
    });
  }

  // --- Combination: zip ---
  runZip(): void {
    const result: string[] = [];
    const a = of('a1', 'a2', 'a3');
    const b = of('b1', 'b2', 'b3', 'b4');
    zip(a, b)
      .pipe(map(([x, y]) => `${x}+${y}`))
      .subscribe({
        next: (v) => result.push(v),
        complete: () => this.zipOutput.set(result),
      });
  }

  // --- Combination: forkJoin ---
  runForkJoin(): void {
    forkJoin({
      user: of({ name: 'Alice' }),
      posts: of([1, 2, 3]),
      settings: of({ theme: 'dark' }),
    }).subscribe({
      next: (data) => this.forkJoinOutput.set(JSON.stringify(data, null, 2)),
      error: () => this.forkJoinOutput.set('Error'),
    });
  }

  private setupBehaviorSubject(): void {
    this.subs.add(
      this.behaviorSubject.subscribe((v) => {
        this.behaviorCurrent.set(v);
        this.behaviorLog.update((prev) => [...prev, `Received: ${v}`]);
      })
    );
  }

  emitBehavior(value: number): void {
    this.behaviorSubject.next(value);
  }

  private setupReplaySubject(): void {
    this.replaySubject.next(10);
    this.replaySubject.next(20);
    this.replaySubject.next(30);
    this.subs.add(
      this.replaySubject.subscribe((v) => this.replayLog.update((prev) => [...prev, `Replay: ${v}`]))
    );
    this.replaySubject.next(40);
    this.replaySubject.next(50);
  }

  private setupAsyncSubject(): void {
    this.asyncSubject.next('first');
    this.asyncSubject.next('second');
    this.subs.add(
      this.asyncSubject.subscribe({
        next: (v) => this.asyncLog.update((prev) => [...prev, `Async: ${v}`]),
        complete: () => this.asyncFinal.set('AsyncSubject completed – only last value emitted'),
      })
    );
    this.asyncSubject.next('last');
    this.asyncSubject.complete();
  }

  private setupOperatorChaining(): void {
    const result: string[] = [];
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter((x) => x % 2 === 0),
        take(3),
        map((x) => x * 10),
        map((x) => `Chain: ${x}`)
      )
      .subscribe({
        next: (v) => result.push(v),
        complete: () => this.chainOutput.set(result),
      });
  }

  runChainAgain(): void {
    const result: string[] = [];
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      .pipe(
        filter((x) => x % 2 === 0),
        take(3),
        map((x) => x * 10),
        map((x) => `Chain: ${x}`)
      )
      .subscribe({
        next: (v) => result.push(v),
        complete: () => this.chainOutput.set(result),
      });
  }
}
