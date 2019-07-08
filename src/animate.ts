import EventReceiver from './EventReceiver';
import { setStyles } from './utils';

interface AnimatorTransition {
  node: HTMLElement;
  targetStyles: object;
  eventReceiver: EventReceiver;
}

class Animator {
  public static async animate(
    node: HTMLElement,
    targetStyles: object
  ): Promise<void> {
    await Animator.process({
      node,
      targetStyles,
      eventReceiver: new EventReceiver(node),
    });
  }

  private static async process(transition: AnimatorTransition): Promise<void> {
    return new Promise((resolve) => {
      transition.eventReceiver.on('transitionend', () => {
        transition.eventReceiver.destroy();
        resolve();
      });

      setTimeout(() => {
        setStyles(transition.node, transition.targetStyles);
      }, 10);
    });
  }
}

export default Animator.animate;
