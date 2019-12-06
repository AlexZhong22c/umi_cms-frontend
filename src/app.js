/**
 * @file 在其他js体系中原本是不用加这一层catch error的。在dva体系中，加这个是为了不让dva错误没有被最终捕获而在下一次js事件中部分代码无法被触发。(原因不明)
 * 只要加了全局onError就没有这种bug了，最终效果和其他js体系一样。
 */

export const dva = {
  config: {
    // 消费1次：该onError能消费一次错误，避免错误没有最终被catch而导致dva体系部分代码无法再被触发。
    onError(e) {
      // 再保底消费1次：消费掉 dispatch 返回的 Promise的错误
      e.preventDefault();

      console.error(e);
    },
  }
};
