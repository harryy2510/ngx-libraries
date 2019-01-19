import { Directive, forwardRef, Injectable, Input, OnChanges } from '@angular/core';
import { VirtualScrollStrategy, CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export class TableVirtualScrollStrategy implements VirtualScrollStrategy {

  private readonly indexChange = new Subject<number>();

  private viewport: CdkVirtualScrollViewport;

  public scrolledIndexChange: Observable<number>;

  private readonly bufferSize = 5;

  constructor(private scrollHeight: number, private headerOffset: number) {
    this.scrolledIndexChange = this.indexChange.asObservable().pipe(distinctUntilChanged());
  }

  public attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.onDataLengthChanged();
    this.updateContent(viewport);
  }

  public detach(): void {
    // no-op
  }

  public onContentScrolled(): void {
    this.updateContent(this.viewport);
  }

  public onDataLengthChanged(): void {
    if (this.viewport) {
      this.viewport.setTotalContentSize(this.viewport.getDataLength() * this.scrollHeight);
    }
  }

  public onContentRendered(): void {
    // no-op
  }

  public onRenderedOffsetChanged(): void {
    // no-op
  }

  public scrollToIndex(index: number, behavior: ScrollBehavior): void {
    // no-op
  }

  public setScrollHeight(rowHeight: number, headerOffset: number) {
    this.scrollHeight = rowHeight;
    this.headerOffset = headerOffset;
    this.updateContent(this.viewport);
  }

  private updateContent(viewport: CdkVirtualScrollViewport) {
    if (viewport) {
      const range = Math.ceil(viewport.getViewportSize() / this.scrollHeight) + this.bufferSize * 2;
      const newIndex = Math.max(0, Math.round((viewport.measureScrollOffset() - this.headerOffset) / this.scrollHeight) - this.bufferSize);
      const dataLength = this.viewport.getDataLength();

      const start = Math.max(0, newIndex - this.bufferSize);
      const end = Math.min(dataLength, newIndex + range);

      viewport.setRenderedContentOffset(this.scrollHeight * start);
      viewport.setRenderedRange({start, end});

      this.indexChange.next(newIndex);
    }
  }
}

export function scrollStrategyFactory(scroll: TableFixedSizeVirtualScroll) {
  return scroll.scrollStrategy;
}

@Directive({
  selector: 'cdk-virtual-scroll-viewport[rowHeight]',
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: scrollStrategyFactory,
    deps: [forwardRef(() => TableFixedSizeVirtualScroll)],
  }],
})
export class TableFixedSizeVirtualScroll implements OnChanges {
  @Input()
  rowHeight: number = 40;

  @Input()
  offset: number = 40;

  public scrollStrategy = new TableVirtualScrollStrategy(this.rowHeight, this.offset);

  public ngOnChanges() {
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.offset);
  }
}
