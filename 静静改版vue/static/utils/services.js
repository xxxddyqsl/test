import utils from './utils';
var _mod = '- Emoji Modifier Fitzpatrick Type-';
var table = [{ u: '1F600', e: '😀', n: 'Grinning Face', f: 1, s: 'grinning' }, { u: '1F62C', e: '😬', n: 'Grimacing Face', f: 1, s: 'grimacing' }, { u: '1F601', e: '😁', n: 'Grinning Face With Smiling Eyes', f: 1, s: 'grin' }, { u: '1F602', e: '😂', n: 'Face With Tears Of Joy', f: 1, s: 'joy' }, { u: '1F603', e: '😃', n: 'Smiling Face With Open Mouth', f: 1, s: 'smiley' }, { u: '1F604', e: '😄', n: 'Smiling Face With Open Mouth And Smiling Eyes', f: 1, s: 'smile' }, { u: '1F605', e: '😅', n: 'Smiling Face With Open Mouth And Cold Sweat', f: 1, s: 'sweat_smile' }, { u: '1F606', e: '😆', n: 'Smiling Face With Open Mouth And Tightly-closed Eyes', f: 1, s: 'laughing' }, { u: '1F607', e: '😇', n: 'Smiling Face With Halo', f: 1, s: 'innocent' }, { u: '1F609', e: '😉', n: 'Winking Face', f: 1, s: 'wink' }, { u: '1F60A', e: '😊', n: 'Smiling Face With Smiling Eyes', f: 1, s: 'blush' }, { u: '1F642', e: '🙂', n: 'Slightly Smiling Face', f: 1, s: 'slight_smile' }, { u: '1F643', e: '🙃', n: 'Upside-down Face', f: 1 }, { u: '263A', e: '☺️', n: 'White Smiling Face', f: 1, s: 'relaxed' }, { u: '1F60B', e: '😋', n: 'Face Savouring Delicious Food', f: 1, s: 'yum' }, { u: '1F60C', e: '😌', n: 'Relieved Face', f: 1, s: 'relieved' }, { u: '1F60D', e: '😍', n: 'Smiling Face With Heart-shaped Eyes', f: 1, s: 'heart_eyes' }, { u: '1F618', e: '😘', n: 'Face Throwing A Kiss', f: 1, s: 'kissing_heart' }, { u: '1F617', e: '😗', n: 'Kissing Face', f: 1, s: 'kissing' }, { u: '1F619', e: '😙', n: 'Kissing Face With Smiling Eyes', f: 1, s: 'kissing_smiling_eyes' }, { u: '1F61A', e: '😚', n: 'Kissing Face With Closed Eyes', f: 1, s: 'kissing_closed_eyes' }, { u: '1F61C', e: '😜', n: 'Face With Stuck-out Tongue And Winking Eye', f: 1, s: 'stuck_out_tongue_winking_eye' }, { u: '1F61D', e: '😝', n: 'Face With Stuck-out Tongue And Tightly-closed Eyes', f: 1, s: 'stuck_out_tongue_closed_eyes' }, { u: '1F61B', e: '😛', n: 'Face With Stuck-out Tongue', f: 1, s: 'stuck_out_tongue' }, { u: '1F911', e: '🤑', n: 'Money-mouth Face', f: 1 }, { u: '1F913', e: '🤓', n: 'Nerd Face', f: 1 }, { u: '1F60E', e: '😎', n: 'Smiling Face With Sunglasses', f: 1, s: 'sunglasses' }, { u: '1F917', e: '🤗', n: 'Hugging Face', f: 1 }, { u: '1F60F', e: '😏', n: 'Smirking Face', f: 1, s: 'smirk' }, { u: '1F636', e: '😶', n: 'Face Without Mouth', f: 1, s: 'no_mouth' }, { u: '1F610', e: '😐', n: 'Neutral Face', f: 1, s: 'neutral_face' }, { u: '1F611', e: '😑', n: 'Expressionless Face', f: 1, s: 'expressionless' }, { u: '1F612', e: '😒', n: 'Unamused Face', f: 1, s: 'unamused' }, { u: '1F644', e: '🙄', n: 'Face With Rolling Eyes', f: 1 }, { u: '1F914', e: '🤔', n: 'Thinking Face', f: 1 }, { u: '1F633', e: '😳', n: 'Flushed Face', f: 1, s: 'flushed' }, { u: '1F61E', e: '😞', n: 'Disappointed Face', f: 1, s: 'disappointed' }, { u: '1F61F', e: '😟', n: 'Worried Face', f: 1, s: 'worried' }, { u: '1F620', e: '😠', n: 'Angry Face', f: 1, s: 'angry' }, { u: '1F621', e: '😡', n: 'Pouting Face', f: 1, s: 'rage' }, { u: '1F614', e: '😔', n: 'Pensive Face', f: 1, s: 'pensive' }, { u: '1F615', e: '😕', n: 'Confused Face', f: 1, s: 'confused' }, { u: '1F641', e: '🙁', n: 'Slightly Frowning Face', f: 1, s: 'slight_frown' }, { u: '2639', e: '☹️', n: 'White Frowning Face', f: 1 }, { u: '1F623', e: '😣', n: 'Persevering Face', f: 1, s: 'persevere' }, { u: '1F616', e: '😖', n: 'Confounded Face', f: 1, s: 'confounded' }, { u: '1F62B', e: '😫', n: 'Tired Face', f: 1, s: 'tired_face' }, { u: '1F629', e: '😩', n: 'Weary Face', f: 1, s: 'weary' }, { u: '1F624', e: '😤', n: 'Face With Look Of Triumph', f: 1, s: 'triumph' }, { u: '1F62E', e: '😮', n: 'Face With Open Mouth', f: 1, s: 'open_mouth' }, { u: '1F631', e: '😱', n: 'Face Screaming In Fear', f: 1, s: 'scream' }, { u: '1F628', e: '😨', n: 'Fearful Face', f: 1, s: 'fearful' }, { u: '1F630', e: '😰', n: 'Face With Open Mouth And Cold Sweat', f: 1, s: 'cold_sweat' }, { u: '1F62F', e: '😯', n: 'Hushed Face', f: 1, s: 'hushed' }, { u: '1F626', e: '😦', n: 'Frowning Face With Open Mouth', f: 1, s: 'frowning' }, { u: '1F627', e: '😧', n: 'Anguished Face', f: 1, s: 'anguished' }, { u: '1F622', e: '😢', n: 'Crying Face', f: 1, s: 'cry' }, { u: '1F625', e: '😥', n: 'Disappointed But Relieved Face', f: 1, s: 'disappointed_relieved' }, { u: '1F62A', e: '😪', n: 'Sleepy Face', f: 1, s: 'sleepy' }, { u: '1F613', e: '😓', n: 'Face With Cold Sweat', f: 1, s: 'sweat' }, { u: '1F62D', e: '😭', n: 'Loudly Crying Face', f: 1, s: 'sob' }, { u: '1F635', e: '😵', n: 'Dizzy Face', f: 1, s: 'dizzy_face' }, { u: '1F632', e: '😲', n: 'Astonished Face', f: 1, s: 'astonished' }, { u: '1F910', e: '🤐', n: 'Zipper-mouth Face', f: 1 }, { u: '1F637', e: '😷', n: 'Face With Medical Mask', f: 1, s: 'mask' }, { u: '1F912', e: '🤒', n: 'Face With Thermometer', f: 1 }, { u: '1F915', e: '🤕', n: 'Face With Head-bandage', f: 1 }, { u: '1F634', e: '😴', n: 'Sleeping Face', f: 1, s: 'sleeping' }, { u: '1F4A4', e: '💤', n: 'Sleeping Symbol', f: 1, s: 'zzz' }, { u: '1F4A9', e: '💩', n: 'Pile Of Poo', f: 1, s: 'poop' }, { u: '1F608', e: '😈', n: 'Smiling Face With Horns', f: 1, s: 'smiling_imp' }, { u: '1F47F', e: '👿', n: 'Imp', f: 1, s: 'imp' }, { u: '1F479', e: '👹', n: 'Japanese Ogre', f: 1, s: 'japanese_ogre' }, { u: '1F47A', e: '👺', n: 'Japanese Goblin', f: 1, s: 'japanese_goblin' }, { u: '1F480', e: '💀', n: 'Skull', f: 1, s: 'skull' }, { u: '1F47B', e: '👻', n: 'Ghost', f: 1, s: 'ghost' }, { u: '1F47D', e: '👽', n: 'Extraterrestrial Alien', f: 1, s: 'alien' }, { u: '1F916', e: '🤖', n: 'Robot Face', f: 1 }, { u: '1F63A', e: '😺', n: 'Smiling Cat Face With Open Mouth', f: 1, s: 'smiley_cat' }, { u: '1F638', e: '😸', n: 'Grinning Cat Face With Smiling Eyes', f: 1, s: 'smile_cat' }, { u: '1F639', e: '😹', n: 'Cat Face With Tears Of Joy', f: 1, s: 'joy_cat' }, { u: '1F63B', e: '😻', n: 'Smiling Cat Face With Heart-shaped Eyes', f: 1, s: 'heart_eyes_cat' }, { u: '1F63C', e: '😼', n: 'Cat Face With Wry Smile', f: 1, s: 'smirk_cat' }, { u: '1F63D', e: '😽', n: 'Kissing Cat Face With Closed Eyes', f: 1, s: 'kissing_cat' }, { u: '1F640', e: '🙀', n: 'Weary Cat Face', f: 1, s: 'scream_cat' }, { u: '1F63F', e: '😿', n: 'Crying Cat Face', f: 1, s: 'crying_cat_face' }, { u: '1F63E', e: '😾', n: 'Pouting Cat Face', f: 1, s: 'pouting_cat' }, { u: '1F64C-1F3FB', e: '🙌🏻', n: 'Person Raising Both Hands In Celebration' + _mod + '1-2', f: 1, s: 'raised_hands' }, { u: '1F64C', e: '🙌', n: 'Person Raising Both Hands In Celebration', f: 1, s: 'raised_hands' }, { u: '1F64C-1F3FC', e: '🙌🏼', n: 'Person Raising Both Hands In Celebration' + _mod + '3', f: 1, s: 'raised_hands' }, { u: '1F64C-1F3FD', e: '🙌🏽', n: 'Person Raising Both Hands In Celebration' + _mod + '4', f: 1, s: 'raised_hands' }, { u: '1F64C-1F3FE', e: '🙌🏾', n: 'Person Raising Both Hands In Celebration' + _mod + '5', f: 1, s: 'raised_hands' }, { u: '1F64C-1F3FF', e: '🙌🏿', n: 'Person Raising Both Hands In Celebration' + _mod + '6', f: 1, s: 'raised_hands' }, { u: '1F44F', e: '👏', n: 'Clapping Hands Sign', f: 1, s: 'clap' }, { u: '1F44F-1F3FB', e: '👏🏻', n: 'Clapping Hands Sign' + _mod + '1-2', f: 1, s: 'clap' }, { u: '1F44F-1F3FC', e: '👏🏼', n: 'Clapping Hands Sign' + _mod + '3', f: 1, s: 'clap' }, { u: '1F44F-1F3FD', e: '👏🏽', n: 'Clapping Hands Sign' + _mod + '4', f: 1, s: 'clap' }, { u: '1F44F-1F3FE', e: '👏🏾', n: 'Clapping Hands Sign' + _mod + '5', f: 1, s: 'clap' }, { u: '1F44F-1F3FF', e: '👏🏿', n: 'Clapping Hands Sign' + _mod + '6', f: 1, s: 'clap' }, { u: '1F44B', e: '👋', n: 'Waving Hand Sign', f: 1, s: 'wave' }, { u: '1F44B-1F3FB', e: '👋🏻', n: 'Waving Hand Sign' + _mod + '1-2', f: 1, s: 'wave' }, { u: '1F44B-1F3FC', e: '👋🏼', n: 'Waving Hand Sign' + _mod + '3', f: 1, s: 'wave' }, { u: '1F44B-1F3FD', e: '👋🏽', n: 'Waving Hand Sign' + _mod + '4', f: 1, s: 'wave' }, { u: '1F44B-1F3FE', e: '👋🏾', n: 'Waving Hand Sign' + _mod + '5', f: 1, s: 'wave' }, { u: '1F44B-1F3FF', e: '👋🏿', n: 'Waving Hand Sign' + _mod + '6', f: 1, s: 'wave' }, { u: '1F44D', e: '👍', n: 'Thumbs Up Sign', f: 1, s: 'thumbsup' }, { u: '1F44D-1F3FB', e: '👍🏻', n: 'Thumbs Up Sign' + _mod + '1-2', f: 1, s: 'thumbsup' }, { u: '1F44D-1F3FC', e: '👍🏼', n: 'Thumbs Up Sign' + _mod + '3', f: 1, s: 'thumbsup' }, { u: '1F44D-1F3FD', e: '👍🏽', n: 'Thumbs Up Sign' + _mod + '4', f: 1, s: 'thumbsup' }, { u: '1F44D-1F3FE', e: '👍🏾', n: 'Thumbs Up Sign' + _mod + '5', f: 1, s: 'thumbsup' }, { u: '1F44D-1F3FF', e: '👍🏿', n: 'Thumbs Up Sign' + _mod + '6', f: 1, s: 'thumbsup' }, { u: '1F44E', e: '👎', n: 'Thumbs Down Sign', f: 1, s: 'thumbsdown' }, { u: '1F44E-1F3FB', e: '👎🏻', n: 'Thumbs Down Sign' + _mod + '1-2', f: 1, s: 'thumbsdown' }, { u: '1F44E-1F3FC', e: '👎🏼', n: 'Thumbs Down Sign' + _mod + '3', f: 1, s: 'thumbsdown' }, { u: '1F44E-1F3FD', e: '👎🏽', n: 'Thumbs Down Sign' + _mod + '4', f: 1, s: 'thumbsdown' }, { u: '1F44E-1F3FE', e: '👎🏾', n: 'Thumbs Down Sign' + _mod + '5', f: 1, s: 'thumbsdown' }, { u: '1F44E-1F3FF', e: '👎🏿', n: 'Thumbs Down Sign' + _mod + '6', f: 1, s: 'thumbsdown' }, { u: '1F44A', e: '👊', n: 'Fisted Hand Sign', f: 1, s: 'punch' }, { u: '1F44A-1F3FB', e: '👊🏻', n: 'Fisted Hand Sign' + _mod + '1-2', f: 1, s: 'punch' }, { u: '1F44A-1F3FC', e: '👊🏼', n: 'Fisted Hand Sign' + _mod + '3', f: 1, s: 'punch' }, { u: '1F44A-1F3FD', e: '👊🏽', n: 'Fisted Hand Sign' + _mod + '4', f: 1, s: 'punch' }, { u: '1F44A-1F3FE', e: '👊🏾', n: 'Fisted Hand Sign' + _mod + '5', f: 1, s: 'punch' }, { u: '1F44A-1F3FF', e: '👊🏿', n: 'Fisted Hand Sign' + _mod + '6', f: 1, s: 'punch' }, { u: '270A', e: '✊', n: 'Raised Fist', f: 1, s: 'fist' }, { u: '270A-1F3FB', e: '✊🏻', n: 'Raised Fist' + _mod + '1-2', f: 1, s: 'fist' }, { u: '270A-1F3FC', e: '✊🏼', n: 'Raised Fist' + _mod + '3', f: 1, s: 'fist' }, { u: '270A-1F3FD', e: '✊🏽', n: 'Raised Fist' + _mod + '4', f: 1, s: 'fist' }, { u: '270A-1F3FE', e: '✊🏾', n: 'Raised Fist' + _mod + '5', f: 1, s: 'fist' }, { u: '270A-1F3FF', e: '✊🏿', n: 'Raised Fist' + _mod + '6', f: 1, s: 'fist' }, { u: '270C', e: '✌️', n: 'Victory Hand', f: 1, s: 'v' }, { u: '270C-1F3FB', e: '✌️🏻', n: 'Victory Hand' + _mod + '1-2', f: 1, s: 'v' }, { u: '270C-1F3FC', e: '✌️🏼', n: 'Victory Hand' + _mod + '3', f: 1, s: 'v' }, { u: '270C-1F3FD', e: '✌️🏽', n: 'Victory Hand' + _mod + '4', f: 1, s: 'v' }, { u: '270C-1F3FE', e: '✌️🏾', n: 'Victory Hand' + _mod + '5', f: 1, s: 'v' }, { u: '270C-1F3FF', e: '✌️🏿', n: 'Victory Hand' + _mod + '6', f: 1, s: 'v' }, { u: '1F44C-1F3FB', e: '👌🏻', n: 'Ok Hand Sign' + _mod + '1-2', f: 1, s: 'ok_hand' }, { u: '1F44C', e: '👌', n: 'Ok Hand Sign', f: 1, s: 'ok_hand' }, { u: '1F44C-1F3FC', e: '👌🏼', n: 'Ok Hand Sign' + _mod + '3', f: 1, s: 'ok_hand' }, { u: '1F44C-1F3FD', e: '👌🏽', n: 'Ok Hand Sign' + _mod + '4', f: 1, s: 'ok_hand' }, { u: '1F44C-1F3FE', e: '👌🏾', n: 'Ok Hand Sign' + _mod + '5', f: 1, s: 'ok_hand' }, { u: '1F44C-1F3FF', e: '👌🏿', n: 'Ok Hand Sign' + _mod + '6', f: 1, s: 'ok_hand' }, { u: '270B', e: '✋', n: 'Raised Hand', f: 1, s: 'raised_hand' }, { u: '270B-1F3FB', e: '✋🏻', n: 'Raised Hand' + _mod + '1-2', f: 1, s: 'raised_hand' }, { u: '270B-1F3FC', e: '✋🏼', n: 'Raised Hand' + _mod + '3', f: 1, s: 'raised_hand' }, { u: '270B-1F3FD', e: '✋🏽', n: 'Raised Hand' + _mod + '4', f: 1, s: 'raised_hand' }, { u: '270B-1F3FE', e: '✋🏾', n: 'Raised Hand' + _mod + '5', f: 1, s: 'raised_hand' }, { u: '270B-1F3FF', e: '✋🏿', n: 'Raised Hand' + _mod + '6', f: 1, s: 'raised_hand' }, { u: '1F450', e: '👐', n: 'Open Hands Sign', f: 1, s: 'open_hands' }, { u: '1F450-1F3FB', e: '👐🏻', n: 'Open Hands Sign' + _mod + '1-2', f: 1, s: 'open_hands' }, { u: '1F450-1F3FC', e: '👐🏼', n: 'Open Hands Sign' + _mod + '3', f: 1, s: 'open_hands' }, { u: '1F450-1F3FD', e: '👐🏽', n: 'Open Hands Sign' + _mod + '4', f: 1, s: 'open_hands' }, { u: '1F450-1F3FE', e: '👐🏾', n: 'Open Hands Sign' + _mod + '5', f: 1, s: 'open_hands' }, { u: '1F450-1F3FF', e: '👐🏿', n: 'Open Hands Sign' + _mod + '6', f: 1, s: 'open_hands' }, { u: '1F4AA', e: '💪', n: 'Flexed Biceps', f: 1, s: 'muscle' }, { u: '1F4AA-1F3FB', e: '💪🏻', n: 'Flexed Biceps' + _mod + '1-2', f: 1, s: 'muscle' }, { u: '1F4AA-1F3FC', e: '💪🏼', n: 'Flexed Biceps' + _mod + '3', f: 1, s: 'muscle' }, { u: '1F4AA-1F3FD', e: '💪🏽', n: 'Flexed Biceps' + _mod + '4', f: 1, s: 'muscle' }, { u: '1F4AA-1F3FE', e: '💪🏾', n: 'Flexed Biceps' + _mod + '5', f: 1, s: 'muscle' }, { u: '1F4AA-1F3FF', e: '💪🏿', n: 'Flexed Biceps' + _mod + '6', f: 1, s: 'muscle' }, { u: '1F64F', e: '🙏', n: 'Person With Folded Hands', f: 1, s: 'pray' }, { u: '1F64F-1F3FB', e: '🙏🏻', n: 'Person With Folded Hands' + _mod + '1-2', f: 1, s: 'pray' }, { u: '1F64F-1F3FC', e: '🙏🏼', n: 'Person With Folded Hands' + _mod + '3', f: 1, s: 'pray' }, { u: '1F64F-1F3FD', e: '🙏🏽', n: 'Person With Folded Hands' + _mod + '4', f: 1, s: 'pray' }, { u: '1F64F-1F3FE', e: '🙏🏾', n: 'Person With Folded Hands' + _mod + '5', f: 1, s: 'pray' }, { u: '1F64F-1F3FF', e: '🙏🏿', n: 'Person With Folded Hands' + _mod + '6', f: 1, s: 'pray' }, { u: '261D', e: '☝️', n: 'White Up Pointing Index', f: 1, s: 'point_up' }, { u: '261D-1F3FB', e: '☝️🏻', n: 'White Up Pointing Index' + _mod + '1-2', f: 1, s: 'point_up' }, { u: '261D-1F3FC', e: '☝️🏼', n: 'White Up Pointing Index' + _mod + '3', f: 1, s: 'point_up' }, { u: '261D-1F3FD', e: '☝️🏽', n: 'White Up Pointing Index' + _mod + '4', f: 1, s: 'point_up' }, { u: '261D-1F3FE', e: '☝️🏾', n: 'White Up Pointing Index' + _mod + '5', f: 1, s: 'point_up' }, { u: '261D-1F3FF', e: '☝️🏿', n: 'White Up Pointing Index' + _mod + '6', f: 1, s: 'point_up' }, { u: '1F446', e: '👆', n: 'White Up Pointing Backhand Index', f: 1, s: 'point_up_2' }, { u: '1F446-1F3FB', e: '👆🏻', n: 'White Up Pointing Backhand Index' + _mod + '1-2', f: 1, s: 'point_up_2' }, { u: '1F446-1F3FC', e: '👆🏼', n: 'White Up Pointing Backhand Index' + _mod + '3', f: 1, s: 'point_up_2' }, { u: '1F446-1F3FD', e: '👆🏽', n: 'White Up Pointing Backhand Index' + _mod + '4', f: 1, s: 'point_up_2' }, { u: '1F446-1F3FE', e: '👆🏾', n: 'White Up Pointing Backhand Index' + _mod + '5', f: 1, s: 'point_up_2' }, { u: '1F446-1F3FF', e: '👆🏿', n: 'White Up Pointing Backhand Index' + _mod + '6', f: 1, s: 'point_up_2' }, { u: '1F447', e: '👇', n: 'White Down Pointing Backhand Index', f: 1, s: 'point_down' }, { u: '1F447-1F3FB', e: '👇🏻', n: 'White Down Pointing Backhand Index' + _mod + '1-2', f: 1, s: 'point_down' }, { u: '1F447-1F3FC', e: '👇🏼', n: 'White Down Pointing Backhand Index' + _mod + '3', f: 1, s: 'point_down' }, { u: '1F447-1F3FD', e: '👇🏽', n: 'White Down Pointing Backhand Index' + _mod + '4', f: 1, s: 'point_down' }, { u: '1F447-1F3FE', e: '👇🏾', n: 'White Down Pointing Backhand Index' + _mod + '5', f: 1, s: 'point_down' }, { u: '1F447-1F3FF', e: '👇🏿', n: 'White Down Pointing Backhand Index' + _mod + '6', f: 1, s: 'point_down' }, { u: '1F448', e: '👈', n: 'White Left Pointing Backhand Index', f: 1, s: 'point_left' }, { u: '1F448-1F3FB', e: '👈🏻', n: 'White Left Pointing Backhand Index' + _mod + '1-2', f: 1, s: 'point_left' }, { u: '1F448-1F3FC', e: '👈🏼', n: 'White Left Pointing Backhand Index' + _mod + '3', f: 1, s: 'point_left' }, { u: '1F448-1F3FD', e: '👈🏽', n: 'White Left Pointing Backhand Index' + _mod + '4', f: 1, s: 'point_left' }, { u: '1F448-1F3FE', e: '👈🏾', n: 'White Left Pointing Backhand Index' + _mod + '5', f: 1, s: 'point_left' }, { u: '1F448-1F3FF', e: '👈🏿', n: 'White Left Pointing Backhand Index' + _mod + '6', f: 1, s: 'point_left' }, { u: '1F449', e: '👉', n: 'White Right Pointing Backhand Index', f: 1, s: 'point_right' }, { u: '1F449-1F3FB', e: '👉🏻', n: 'White Right Pointing Backhand Index' + _mod + '1-2', f: 1, s: 'point_right' }, { u: '1F449-1F3FC', e: '👉🏼', n: 'White Right Pointing Backhand Index' + _mod + '3', f: 1, s: 'point_right' }, { u: '1F449-1F3FD', e: '👉🏽', n: 'White Right Pointing Backhand Index' + _mod + '4', f: 1, s: 'point_right' }, { u: '1F449-1F3FE', e: '👉🏾', n: 'White Right Pointing Backhand Index' + _mod + '5', f: 1, s: 'point_right' }, { u: '1F449-1F3FF', e: '👉🏿', n: 'White Right Pointing Backhand Index' + _mod + '6', f: 1, s: 'point_right' }, { u: '1F595-1F3FB', e: '🖕🏻', n: 'Reversed Hand With Middle Finger Extended' + _mod + '1-2', f: 1, s: 'middle_finger' }, { u: '1F595', e: '🖕', n: 'Reversed Hand With Middle Finger Extended', f: 1, s: 'middle_finger' }, { u: '1F595-1F3FC', e: '🖕🏼', n: 'Reversed Hand With Middle Finger Extended' + _mod + '3', f: 1, s: 'middle_finger' }, { u: '1F595-1F3FD', e: '🖕🏽', n: 'Reversed Hand With Middle Finger Extended' + _mod + '4', f: 1, s: 'middle_finger' }, { u: '1F595-1F3FE', e: '🖕🏾', n: 'Reversed Hand With Middle Finger Extended' + _mod + '5', f: 1, s: 'middle_finger' }, { u: '1F595-1F3FF', e: '🖕🏿', n: 'Reversed Hand With Middle Finger Extended' + _mod + '6', f: 1, s: 'middle_finger' }, { u: '1F590-1F3FB', e: '🖐🏻', n: 'Raised Hand With Fingers Splayed' + _mod + '1-2', f: 1, s: 'hand_splayed' }, { u: '1F590', e: '🖐', n: 'Raised Hand With Fingers Splayed', f: 1, s: 'hand_splayed' }, { u: '1F590-1F3FC', e: '🖐🏼', n: 'Raised Hand With Fingers Splayed' + _mod + '3', f: 1, s: 'hand_splayed' }, { u: '1F590-1F3FD', e: '🖐🏽', n: 'Raised Hand With Fingers Splayed' + _mod + '4', f: 1, s: 'hand_splayed' }, { u: '1F590-1F3FE', e: '🖐🏾', n: 'Raised Hand With Fingers Splayed' + _mod + '5', f: 1, s: 'hand_splayed' }, { u: '1F590-1F3FF', e: '🖐🏿', n: 'Raised Hand With Fingers Splayed' + _mod + '6', f: 1, s: 'hand_splayed' }, { u: '1F918', e: '🤘', n: 'Sign Of The Horns', f: 1 }, { u: '1F918-1F3FB', e: '🤘🏻', n: 'Sign Of The Horns' + _mod + '1-2', f: 1 }, { u: '1F918-1F3FC', e: '🤘🏼', n: 'Sign Of The Horns' + _mod + '3', f: 1 }, { u: '1F918-1F3FD', e: '🤘🏽', n: 'Sign Of The Horns' + _mod + '4', f: 1 }, { u: '1F918-1F3FE', e: '🤘🏾', n: 'Sign Of The Horns' + _mod + '5', f: 1 }, { u: '1F918-1F3FF', e: '🤘🏿', n: 'Sign Of The Horns' + _mod + '6', f: 1 }, { u: '1F596', e: '🖖', n: 'Raised Hand With Part Between Middle And Ring Fingers', f: 1, s: 'vulcan' }, { u: '1F596-1F3FB', e: '🖖🏻', n: 'Raised Hand With Part Between Middle And Ring Fingers' + _mod + '1-2', f: 1, s: 'vulcan' }, { u: '1F596-1F3FC', e: '🖖🏼', n: 'Raised Hand With Part Between Middle And Ring Fingers' + _mod + '3', f: 1, s: 'vulcan' }, { u: '1F596-1F3FD', e: '🖖🏽', n: 'Raised Hand With Part Between Middle And Ring Fingers' + _mod + '4', f: 1, s: 'vulcan' }, { u: '1F596-1F3FE', e: '🖖🏾', n: 'Raised Hand With Part Between Middle And Ring Fingers' + _mod + '5', f: 1, s: 'vulcan' }, { u: '1F596-1F3FF', e: '🖖🏿', n: 'Raised Hand With Part Between Middle And Ring Fingers' + _mod + '6', f: 1, s: 'vulcan' }, { u: '270D', e: '✍', n: 'Writing Hand', f: 1 }, { u: '270D-1F3FB', e: '✍🏻', n: 'Writing Hand' + _mod + '1-2', f: 1 }, { u: '270D-1F3FC', e: '✍🏼', n: 'Writing Hand' + _mod + '3', f: 1 }, { u: '270D-1F3FD', e: '✍🏽', n: 'Writing Hand' + _mod + '4', f: 1 }, { u: '270D-1F3FE', e: '✍🏾', n: 'Writing Hand' + _mod + '5', f: 1 }, { u: '270D-1F3FF', e: '✍🏿', n: 'Writing Hand' + _mod + '6', f: 1 }, { u: '1F485', e: '💅', n: 'Nail Polish', f: 1, s: 'nail_care' }, { u: '1F485-1F3FB', e: '💅🏻', n: 'Nail Polish' + _mod + '1-2', f: 1, s: 'nail_care' }, { u: '1F485-1F3FC', e: '💅🏼', n: 'Nail Polish' + _mod + '3', f: 1, s: 'nail_care' }, { u: '1F485-1F3FD', e: '💅🏽', n: 'Nail Polish' + _mod + '4', f: 1, s: 'nail_care' }, { u: '1F485-1F3FE', e: '💅🏾', n: 'Nail Polish' + _mod + '5', f: 1, s: 'nail_care' }, { u: '1F485-1F3FF', e: '💅🏿', n: 'Nail Polish' + _mod + '6', f: 1, s: 'nail_care' }, { u: '1F444', e: '👄', n: 'Mouth', f: 1, s: 'lips' }, { u: '1F445', e: '👅', n: 'Tongue', f: 1, s: 'tongue' }, { u: '1F442', e: '👂', n: 'Ear', f: 1, s: 'ear' }, { u: '1F442-1F3FB', e: '👂🏻', n: 'Ear' + _mod + '1-2', f: 1, s: 'ear' }, { u: '1F442-1F3FC', e: '👂🏼', n: 'Ear' + _mod + '3', f: 1, s: 'ear' }, { u: '1F442-1F3FD', e: '👂🏽', n: 'Ear' + _mod + '4', f: 1, s: 'ear' }, { u: '1F442-1F3FE', e: '👂🏾', n: 'Ear' + _mod + '5', f: 1, s: 'ear' }, { u: '1F442-1F3FF', e: '👂🏿', n: 'Ear' + _mod + '6', f: 1, s: 'ear' }, { u: '1F443', e: '👃', n: 'Nose', f: 1, s: 'nose' }, { u: '1F443-1F3FB', e: '👃🏻', n: 'Nose' + _mod + '1-2', f: 1, s: 'nose' }, { u: '1F443-1F3FC', e: '👃🏼', n: 'Nose' + _mod + '3', f: 1, s: 'nose' }, { u: '1F443-1F3FD', e: '👃🏽', n: 'Nose' + _mod + '4', f: 1, s: 'nose' }, { u: '1F443-1F3FE', e: '👃🏾', n: 'Nose' + _mod + '5', f: 1, s: 'nose' }, { u: '1F443-1F3FF', e: '👃🏿', n: 'Nose' + _mod + '6', f: 1, s: 'nose' }, { u: '1F441', e: '👁', n: 'Eye', f: 1, s: 'eye' }, { u: '1F440', e: '👀', n: 'Eyes', f: 1, s: 'eyes' }, { u: '1F464', e: '👤', n: 'Bust In Silhouette', f: 1, s: 'bust_in_silhouette' }, { u: '1F465', e: '👥', n: 'Busts In Silhouette', f: 1, s: 'busts_in_silhouette' }, { u: '1F5E3', e: '🗣', n: 'Speaking Head In Silhouette', f: 1, s: 'speaking_head' }, { u: '1F476', e: '👶', n: 'Baby', f: 1, s: 'baby' }, { u: '1F476-1F3FB', e: '👶🏻', n: 'Baby' + _mod + '1-2', f: 1, s: 'baby' }, { u: '1F476-1F3FC', e: '👶🏼', n: 'Baby' + _mod + '3', f: 1, s: 'baby' }, { u: '1F476-1F3FD', e: '👶🏽', n: 'Baby' + _mod + '4', f: 1, s: 'baby' }, { u: '1F476-1F3FE', e: '👶🏾', n: 'Baby' + _mod + '5', f: 1, s: 'baby' }, { u: '1F476-1F3FF', e: '👶🏿', n: 'Baby' + _mod + '6', f: 1, s: 'baby' }, { u: '1F466', e: '👦', n: 'Boy', f: 1, s: 'boy' }, { u: '1F466-1F3FB', e: '👦🏻', n: 'Boy' + _mod + '1-2', f: 1, s: 'boy' }, { u: '1F466-1F3FC', e: '👦🏼', n: 'Boy' + _mod + '3', f: 1, s: 'boy' }, { u: '1F466-1F3FD', e: '👦🏽', n: 'Boy' + _mod + '4', f: 1, s: 'boy' }, { u: '1F466-1F3FE', e: '👦🏾', n: 'Boy' + _mod + '5', f: 1, s: 'boy' }, { u: '1F466-1F3FF', e: '👦🏿', n: 'Boy' + _mod + '6', f: 1, s: 'boy' }, { u: '1F467', e: '👧', n: 'Girl', f: 1, s: 'girl' }, { u: '1F467-1F3FB', e: '👧🏻', n: 'Girl' + _mod + '1-2', f: 1, s: 'girl' }, { u: '1F467-1F3FC', e: '👧🏼', n: 'Girl' + _mod + '3', f: 1, s: 'girl' }, { u: '1F467-1F3FD', e: '👧🏽', n: 'Girl' + _mod + '4', f: 1, s: 'girl' }, { u: '1F467-1F3FE', e: '👧🏾', n: 'Girl' + _mod + '5', f: 1, s: 'girl' }, { u: '1F467-1F3FF', e: '👧🏿', n: 'Girl' + _mod + '6', f: 1, s: 'girl' }, { u: '1F468', e: '👨', n: 'Man', f: 1, s: 'man' }, { u: '1F468-1F3FB', e: '👨🏻', n: 'Man' + _mod + '1-2', f: 1, s: 'man' }, { u: '1F468-1F3FC', e: '👨🏼', n: 'Man' + _mod + '3', f: 1, s: 'man' }, { u: '1F468-1F3FD', e: '👨🏽', n: 'Man' + _mod + '4', f: 1, s: 'man' }, { u: '1F468-1F3FE', e: '👨🏾', n: 'Man' + _mod + '5', f: 1, s: 'man' }, { u: '1F468-1F3FF', e: '👨🏿', n: 'Man' + _mod + '6', f: 1, s: 'man' }, { u: '1F469', e: '👩', n: 'Woman', f: 1, s: 'woman' }, { u: '1F469-1F3FB', e: '👩🏻', n: 'Woman' + _mod + '1-2', f: 1, s: 'woman' }, { u: '1F469-1F3FC', e: '👩🏼', n: 'Woman' + _mod + '3', f: 1, s: 'woman' }, { u: '1F469-1F3FD', e: '👩🏽', n: 'Woman' + _mod + '4', f: 1, s: 'woman' }, { u: '1F469-1F3FE', e: '👩🏾', n: 'Woman' + _mod + '5', f: 1, s: 'woman' }, { u: '1F469-1F3FF', e: '👩🏿', n: 'Woman' + _mod + '6', f: 1, s: 'woman' }, { u: '1F471-1F3FB', e: '👱🏻', n: 'Person With Blond Hair' + _mod + '1-2', f: 1, s: 'person_with_blond_hair' }, { u: '1F471', e: '👱', n: 'Person With Blond Hair', f: 1, s: 'person_with_blond_hair' }, { u: '1F471-1F3FC', e: '👱🏼', n: 'Person With Blond Hair' + _mod + '3', f: 1, s: 'person_with_blond_hair' }, { u: '1F471-1F3FD', e: '👱🏽', n: 'Person With Blond Hair' + _mod + '4', f: 1, s: 'person_with_blond_hair' }, { u: '1F471-1F3FE', e: '👱🏾', n: 'Person With Blond Hair' + _mod + '5', f: 1, s: 'person_with_blond_hair' }, { u: '1F471-1F3FF', e: '👱🏿', n: 'Person With Blond Hair' + _mod + '6', f: 1, s: 'person_with_blond_hair' }, { u: '1F474', e: '👴', n: 'Older Man', f: 1, s: 'older_man' }, { u: '1F474-1F3FB', e: '👴🏻', n: 'Older Man' + _mod + '1-2', f: 1, s: 'older_man' }, { u: '1F474-1F3FC', e: '👴🏼', n: 'Older Man' + _mod + '3', f: 1, s: 'older_man' }, { u: '1F474-1F3FD', e: '👴🏽', n: 'Older Man' + _mod + '4', f: 1, s: 'older_man' }, { u: '1F474-1F3FE', e: '👴🏾', n: 'Older Man' + _mod + '5', f: 1, s: 'older_man' }, { u: '1F474-1F3FF', e: '👴🏿', n: 'Older Man' + _mod + '6', f: 1, s: 'older_man' }, { u: '1F475', e: '👵', n: 'Older Woman', f: 1, s: 'older_woman' }, { u: '1F475-1F3FB', e: '👵🏻', n: 'Older Woman' + _mod + '1-2', f: 1, s: 'older_woman' }, { u: '1F475-1F3FC', e: '👵🏼', n: 'Older Woman' + _mod + '3', f: 1, s: 'older_woman' }, { u: '1F475-1F3FD', e: '👵🏽', n: 'Older Woman' + _mod + '4', f: 1, s: 'older_woman' }, { u: '1F475-1F3FE', e: '👵🏾', n: 'Older Woman' + _mod + '5', f: 1, s: 'older_woman' }, { u: '1F475-1F3FF', e: '👵🏿', n: 'Older Woman' + _mod + '6', f: 1, s: 'older_woman' }, { u: '1F472-1F3FB', e: '👲🏻', n: 'Man With Gua Pi Mao' + _mod + '1-2', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F472', e: '👲', n: 'Man With Gua Pi Mao', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F472-1F3FC', e: '👲🏼', n: 'Man With Gua Pi Mao' + _mod + '3', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F472-1F3FD', e: '👲🏽', n: 'Man With Gua Pi Mao' + _mod + '4', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F472-1F3FE', e: '👲🏾', n: 'Man With Gua Pi Mao' + _mod + '5', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F472-1F3FF', e: '👲🏿', n: 'Man With Gua Pi Mao' + _mod + '6', f: 1, s: 'man_with_gua_pi_mao' }, { u: '1F473-1F3FB', e: '👳🏻', n: 'Man With Turban' + _mod + '1-2', f: 1, s: 'man_with_turban' }, { u: '1F473', e: '👳', n: 'Man With Turban', f: 1, s: 'man_with_turban' }, { u: '1F473-1F3FC', e: '👳🏼', n: 'Man With Turban' + _mod + '3', f: 1, s: 'man_with_turban' }, { u: '1F473-1F3FD', e: '👳🏽', n: 'Man With Turban' + _mod + '4', f: 1, s: 'man_with_turban' }, { u: '1F473-1F3FE', e: '👳🏾', n: 'Man With Turban' + _mod + '5', f: 1, s: 'man_with_turban' }, { u: '1F473-1F3FF', e: '👳🏿', n: 'Man With Turban' + _mod + '6', f: 1, s: 'man_with_turban' }, { u: '1F46E', e: '👮', n: 'Police Officer', f: 1, s: 'cop' }, { u: '1F46E-1F3FB', e: '👮🏻', n: 'Police Officer' + _mod + '1-2', f: 1, s: 'cop' }, { u: '1F46E-1F3FC', e: '👮🏼', n: 'Police Officer' + _mod + '3', f: 1, s: 'cop' }, { u: '1F46E-1F3FD', e: '👮🏽', n: 'Police Officer' + _mod + '4', f: 1, s: 'cop' }, { u: '1F46E-1F3FE', e: '👮🏾', n: 'Police Officer' + _mod + '5', f: 1, s: 'cop' }, { u: '1F46E-1F3FF', e: '👮🏿', n: 'Police Officer' + _mod + '6', f: 1, s: 'cop' }, { u: '1F477', e: '👷', n: 'Construction Worker', f: 1, s: 'construction_worker' }, { u: '1F477-1F3FB', e: '👷🏻', n: 'Construction Worker' + _mod + '1-2', f: 1, s: 'construction_worker' }, { u: '1F477-1F3FC', e: '👷🏼', n: 'Construction Worker' + _mod + '3', f: 1, s: 'construction_worker' }, { u: '1F477-1F3FD', e: '👷🏽', n: 'Construction Worker' + _mod + '4', f: 1, s: 'construction_worker' }, { u: '1F477-1F3FE', e: '👷🏾', n: 'Construction Worker' + _mod + '5', f: 1, s: 'construction_worker' }, { u: '1F477-1F3FF', e: '👷🏿', n: 'Construction Worker' + _mod + '6', f: 1, s: 'construction_worker' }, { u: '1F482', e: '💂', n: 'Guardsman', f: 1, s: 'guardsman' }, { u: '1F482-1F3FB', e: '💂🏻', n: 'Guardsman' + _mod + '1-2', f: 1, s: 'guardsman' }, { u: '1F482-1F3FC', e: '💂🏼', n: 'Guardsman' + _mod + '3', f: 1, s: 'guardsman' }, { u: '1F482-1F3FD', e: '💂🏽', n: 'Guardsman' + _mod + '4', f: 1, s: 'guardsman' }, { u: '1F482-1F3FE', e: '💂🏾', n: 'Guardsman' + _mod + '5', f: 1, s: 'guardsman' }, { u: '1F482-1F3FF', e: '💂🏿', n: 'Guardsman' + _mod + '6', f: 1, s: 'guardsman' }, { u: '1F575', e: '🕵', n: 'Sleuth Or Spy', f: 1, s: 'spy' }, { u: '1F385', e: '🎅', n: 'Father Christmas', f: 1, s: 'santa' }, { u: '1F385-1F3FB', e: '🎅🏻', n: 'Father Christmas' + _mod + '1-2', f: 1, s: 'santa' }, { u: '1F385-1F3FC', e: '🎅🏼', n: 'Father Christmas' + _mod + '3', f: 1, s: 'santa' }, { u: '1F385-1F3FD', e: '🎅🏽', n: 'Father Christmas' + _mod + '4', f: 1, s: 'santa' }, { u: '1F385-1F3FE', e: '🎅🏾', n: 'Father Christmas' + _mod + '5', f: 1, s: 'santa' }, { u: '1F385-1F3FF', e: '🎅🏿', n: 'Father Christmas' + _mod + '6', f: 1, s: 'santa' }, { u: '1F47C', e: '👼', n: 'Baby Angel', f: 1, s: 'angel' }, { u: '1F47C-1F3FB', e: '👼🏻', n: 'Baby Angel' + _mod + '1-2', f: 1, s: 'angel' }, { u: '1F47C-1F3FC', e: '👼🏼', n: 'Baby Angel' + _mod + '3', f: 1, s: 'angel' }, { u: '1F47C-1F3FD', e: '👼🏽', n: 'Baby Angel' + _mod + '4', f: 1, s: 'angel' }, { u: '1F47C-1F3FE', e: '👼🏾', n: 'Baby Angel' + _mod + '5', f: 1, s: 'angel' }, { u: '1F47C-1F3FF', e: '👼🏿', n: 'Baby Angel' + _mod + '6', f: 1, s: 'angel' }, { u: '1F478', e: '👸', n: 'Princess', f: 1, s: 'princess' }, { u: '1F478-1F3FB', e: '👸🏻', n: 'Princess' + _mod + '1-2', f: 1, s: 'princess' }, { u: '1F478-1F3FC', e: '👸🏼', n: 'Princess' + _mod + '3', f: 1, s: 'princess' }, { u: '1F478-1F3FD', e: '👸🏽', n: 'Princess' + _mod + '4', f: 1, s: 'princess' }, { u: '1F478-1F3FE', e: '👸🏾', n: 'Princess' + _mod + '5', f: 1, s: 'princess' }, { u: '1F478-1F3FF', e: '👸🏿', n: 'Princess' + _mod + '6', f: 1, s: 'princess' }, { u: '1F470', e: '👰', n: 'Bride With Veil', f: 1, s: 'bride_with_veil' }, { u: '1F470-1F3FB', e: '👰🏻', n: 'Bride With Veil' + _mod + '1-2', f: 1, s: 'bride_with_veil' }, { u: '1F470-1F3FC', e: '👰🏼', n: 'Bride With Veil' + _mod + '3', f: 1, s: 'bride_with_veil' }, { u: '1F470-1F3FD', e: '👰🏽', n: 'Bride With Veil' + _mod + '4', f: 1, s: 'bride_with_veil' }, { u: '1F470-1F3FE', e: '👰🏾', n: 'Bride With Veil' + _mod + '5', f: 1, s: 'bride_with_veil' }, { u: '1F470-1F3FF', e: '👰🏿', n: 'Bride With Veil' + _mod + '6', f: 1, s: 'bride_with_veil' }, { u: '1F6B6', e: '🚶', n: 'Pedestrian', f: 1, s: 'walking' }, { u: '1F6B6-1F3FB', e: '🚶🏻', n: 'Pedestrian' + _mod + '1-2', f: 1, s: 'walking' }, { u: '1F6B6-1F3FC', e: '🚶🏼', n: 'Pedestrian' + _mod + '3', f: 1, s: 'walking' }, { u: '1F6B6-1F3FD', e: '🚶🏽', n: 'Pedestrian' + _mod + '4', f: 1, s: 'walking' }, { u: '1F6B6-1F3FE', e: '🚶🏾', n: 'Pedestrian' + _mod + '5', f: 1, s: 'walking' }, { u: '1F6B6-1F3FF', e: '🚶🏿', n: 'Pedestrian' + _mod + '6', f: 1, s: 'walking' }, { u: '1F3C3-1F3FB', e: '🏃🏻', n: 'Runner' + _mod + '1-2', f: 1, s: 'runner' }, { u: '1F3C3', e: '🏃', n: 'Runner', f: 1, s: 'runner' }, { u: '1F3C3-1F3FC', e: '🏃🏼', n: 'Runner' + _mod + '3', f: 1, s: 'runner' }, { u: '1F3C3-1F3FD', e: '🏃🏽', n: 'Runner' + _mod + '4', f: 1, s: 'runner' }, { u: '1F3C3-1F3FE', e: '🏃🏾', n: 'Runner' + _mod + '5', f: 1, s: 'runner' }, { u: '1F3C3-1F3FF', e: '🏃🏿', n: 'Runner' + _mod + '6', f: 1, s: 'runner' }, { u: '1F483', e: '💃', n: 'Dancer', f: 1, s: 'dancer' }, { u: '1F483-1F3FB', e: '💃🏻', n: 'Dancer' + _mod + '1-2', f: 1, s: 'dancer' }, { u: '1F483-1F3FC', e: '💃🏼', n: 'Dancer' + _mod + '3', f: 1, s: 'dancer' }, { u: '1F483-1F3FD', e: '💃🏽', n: 'Dancer' + _mod + '4', f: 1, s: 'dancer' }, { u: '1F483-1F3FE', e: '💃🏾', n: 'Dancer' + _mod + '5', f: 1, s: 'dancer' }, { u: '1F483-1F3FF', e: '💃🏿', n: 'Dancer' + _mod + '6', f: 1, s: 'dancer' }, { u: '1F46F', e: '👯', n: 'Woman With Bunny Ears', f: 1, s: 'dancers' }, { u: '1F46B', e: '👫', n: 'Man And Woman Holding Hands', f: 1, s: 'couple' }, { u: '1F46C', e: '👬', n: 'Two Men Holding Hands', f: 1, s: 'two_men_holding_hands' }, { u: '1F46D', e: '👭', n: 'Two Women Holding Hands', f: 1, s: 'two_women_holding_hands' }, { u: '1F647', e: '🙇', n: 'Person Bowing Deeply', f: 1, s: 'bow' }, { u: '1F647-1F3FB', e: '🙇🏻', n: 'Person Bowing Deeply' + _mod + '1-2', f: 1, s: 'bow' }, { u: '1F647-1F3FC', e: '🙇🏼', n: 'Person Bowing Deeply' + _mod + '3', f: 1, s: 'bow' }, { u: '1F647-1F3FD', e: '🙇🏽', n: 'Person Bowing Deeply' + _mod + '4', f: 1, s: 'bow' }, { u: '1F647-1F3FE', e: '🙇🏾', n: 'Person Bowing Deeply' + _mod + '5', f: 1, s: 'bow' }, { u: '1F647-1F3FF', e: '🙇🏿', n: 'Person Bowing Deeply' + _mod + '6', f: 1, s: 'bow' }, { u: '1F481', e: '💁', n: 'Information Desk Person', f: 1, s: 'information_desk_person' }, { u: '1F481-1F3FB', e: '💁🏻', n: 'Information Desk Person' + _mod + '1-2', f: 1, s: 'information_desk_person' }, { u: '1F481-1F3FC', e: '💁🏼', n: 'Information Desk Person' + _mod + '3', f: 1, s: 'information_desk_person' }, { u: '1F481-1F3FD', e: '💁🏽', n: 'Information Desk Person' + _mod + '4', f: 1, s: 'information_desk_person' }, { u: '1F481-1F3FE', e: '💁🏾', n: 'Information Desk Person' + _mod + '5', f: 1, s: 'information_desk_person' }, { u: '1F481-1F3FF', e: '💁🏿', n: 'Information Desk Person' + _mod + '6', f: 1, s: 'information_desk_person' }, { u: '1F645-1F3FB', e: '🙅🏻', n: 'Face With No Good Gesture' + _mod + '1-2', f: 1, s: 'no_good' }, { u: '1F645', e: '🙅', n: 'Face With No Good Gesture', f: 1, s: 'no_good' }, { u: '1F645-1F3FC', e: '🙅🏼', n: 'Face With No Good Gesture' + _mod + '3', f: 1, s: 'no_good' }, { u: '1F645-1F3FD', e: '🙅🏽', n: 'Face With No Good Gesture' + _mod + '4', f: 1, s: 'no_good' }, { u: '1F645-1F3FE', e: '🙅🏾', n: 'Face With No Good Gesture' + _mod + '5', f: 1, s: 'no_good' }, { u: '1F645-1F3FF', e: '🙅🏿', n: 'Face With No Good Gesture' + _mod + '6', f: 1, s: 'no_good' }, { u: '1F646', e: '🙆', n: 'Face With Ok Gesture', f: 1, s: 'ok_woman' }, { u: '1F646-1F3FB', e: '🙆🏻', n: 'Face With Ok Gesture' + _mod + '1-2', f: 1, s: 'ok_woman' }, { u: '1F646-1F3FC', e: '🙆🏼', n: 'Face With Ok Gesture' + _mod + '3', f: 1, s: 'ok_woman' }, { u: '1F646-1F3FD', e: '🙆🏽', n: 'Face With Ok Gesture' + _mod + '4', f: 1, s: 'ok_woman' }, { u: '1F646-1F3FE', e: '🙆🏾', n: 'Face With Ok Gesture' + _mod + '5', f: 1, s: 'ok_woman' }, { u: '1F646-1F3FF', e: '🙆🏿', n: 'Face With Ok Gesture' + _mod + '6', f: 1, s: 'ok_woman' }, { u: '1F64B-1F3FB', e: '🙋🏻', n: 'Happy Person Raising One Hand' + _mod + '1-2', f: 1, s: 'raising_hand' }, { u: '1F64B', e: '🙋', n: 'Happy Person Raising One Hand', f: 1, s: 'raising_hand' }, { u: '1F64B-1F3FC', e: '🙋🏼', n: 'Happy Person Raising One Hand' + _mod + '3', f: 1, s: 'raising_hand' }, { u: '1F64B-1F3FD', e: '🙋🏽', n: 'Happy Person Raising One Hand' + _mod + '4', f: 1, s: 'raising_hand' }, { u: '1F64B-1F3FE', e: '🙋🏾', n: 'Happy Person Raising One Hand' + _mod + '5', f: 1, s: 'raising_hand' }, { u: '1F64B-1F3FF', e: '🙋🏿', n: 'Happy Person Raising One Hand' + _mod + '6', f: 1, s: 'raising_hand' }, { u: '1F64E-1F3FB', e: '🙎🏻', n: 'Person With Pouting Face' + _mod + '1-2', f: 1, s: 'person_with_pouting_face' }, { u: '1F64E', e: '🙎', n: 'Person With Pouting Face', f: 1, s: 'person_with_pouting_face' }, { u: '1F64E-1F3FC', e: '🙎🏼', n: 'Person With Pouting Face' + _mod + '3', f: 1, s: 'person_with_pouting_face' }, { u: '1F64E-1F3FD', e: '🙎🏽', n: 'Person With Pouting Face' + _mod + '4', f: 1, s: 'person_with_pouting_face' }, { u: '1F64E-1F3FE', e: '🙎🏾', n: 'Person With Pouting Face' + _mod + '5', f: 1, s: 'person_with_pouting_face' }, { u: '1F64E-1F3FF', e: '🙎🏿', n: 'Person With Pouting Face' + _mod + '6', f: 1, s: 'person_with_pouting_face' }, { u: '1F64D-1F3FB', e: '🙍🏻', n: 'Person Frowning' + _mod + '1-2', f: 1, s: 'person_frowning' }, { u: '1F64D', e: '🙍', n: 'Person Frowning', f: 1, s: 'person_frowning' }, { u: '1F64D-1F3FC', e: '🙍🏼', n: 'Person Frowning' + _mod + '3', f: 1, s: 'person_frowning' }, { u: '1F64D-1F3FD', e: '🙍🏽', n: 'Person Frowning' + _mod + '4', f: 1, s: 'person_frowning' }, { u: '1F64D-1F3FE', e: '🙍🏾', n: 'Person Frowning' + _mod + '5', f: 1, s: 'person_frowning' }, { u: '1F64D-1F3FF', e: '🙍🏿', n: 'Person Frowning' + _mod + '6', f: 1, s: 'person_frowning' }, { u: '1F487', e: '💇', n: 'Haircut', f: 1, s: 'haircut' }, { u: '1F487-1F3FB', e: '💇🏻', n: 'Haircut' + _mod + '1-2', f: 1, s: 'haircut' }, { u: '1F487-1F3FC', e: '💇🏼', n: 'Haircut' + _mod + '3', f: 1, s: 'haircut' }, { u: '1F487-1F3FD', e: '💇🏽', n: 'Haircut' + _mod + '4', f: 1, s: 'haircut' }, { u: '1F487-1F3FE', e: '💇🏾', n: 'Haircut' + _mod + '5', f: 1, s: 'haircut' }, { u: '1F487-1F3FF', e: '💇🏿', n: 'Haircut' + _mod + '6', f: 1, s: 'haircut' }, { u: '1F486', e: '💆', n: 'Face Massage', f: 1, s: 'massage' }, { u: '1F486-1F3FB', e: '💆🏻', n: 'Face Massage' + _mod + '1-2', f: 1, s: 'massage' }, { u: '1F486-1F3FC', e: '💆🏼', n: 'Face Massage' + _mod + '3', f: 1, s: 'massage' }, { u: '1F486-1F3FD', e: '💆🏽', n: 'Face Massage' + _mod + '4', f: 1, s: 'massage' }, { u: '1F486-1F3FE', e: '💆🏾', n: 'Face Massage' + _mod + '5', f: 1, s: 'massage' }, { u: '1F486-1F3FF', e: '💆🏿', n: 'Face Massage' + _mod + '6', f: 1, s: 'massage' }, { u: '1F491', e: '💑', n: 'Couple With Heart', f: 1, s: 'couple_with_heart' }, { u: '1F469-2764-1F469', e: '👩‍❤️‍👩', n: 'Couple (Woman, Woman)', f: 1, s: 'couple_ww' }, { u: '1F468-2764-1F468', e: '👨‍❤️‍👨', n: 'Couple (Man, Man)', f: 1, s: 'couple_mm' }, { u: '1F48F', e: '💏', n: 'Kiss', f: 1, s: 'couplekiss' }, { u: '1F469-2764-1F48B-1F469', e: '👩‍❤️‍💋‍👩', n: 'Kiss (Woman, Woman)', f: 1, s: 'kiss_ww' }, { u: '1F468-2764-1F48B-1F468', e: '👨‍❤️‍💋‍👨', n: 'Kiss (Man, Man)', f: 1, s: 'kiss_mm' }, { u: '1F46A', e: '👪', n: 'Family', f: 1, s: 'family' }, { u: '1F468-1F469-1F467', e: '👨‍👩‍👧', n: 'Family (Man, Woman, Girl)', f: 1, s: 'family_mwg' }, { u: '1F468-1F469-1F467-1F466', e: '👨‍👩‍👧‍👦', n: 'Family (Man, Woman, Girl, Boy)', f: 1, s: 'family_mwgb' }, { u: '1F468-1F469-1F466-1F466', e: '👨‍👩‍👦‍👦', n: 'Family (Man, Woman, Boy, Boy)', f: 1, s: 'family_mwbb' }, { u: '1F468-1F469-1F467-1F467', e: '👨‍👩‍👧‍👧', n: 'Family (Man, Woman, Girl, Girl)', f: 1, s: 'family_mwgg' }, { u: '1F469-1F469-1F466', e: '👩‍👩‍👦', n: 'Family (Woman, Woman, Boy)', f: 1, s: 'family_wwb' }, { u: '1F469-1F469-1F467', e: '👩‍👩‍👧', n: 'Family (Woman, Woman, Girl)', f: 1, s: 'family_wwg' }, { u: '1F469-1F469-1F467-1F466', e: '👩‍👩‍👧‍👦', n: 'Family (Woman, Woman, Girl, Boy)', f: 1, s: 'family_wwgb' }, { u: '1F469-1F469-1F466-1F466', e: '👩‍👩‍👦‍👦', n: 'Family (Woman, Woman, Boy, Boy)', f: 1, s: 'family_wwbb' }, { u: '1F469-1F469-1F467-1F467', e: '👩‍👩‍👧‍👧', n: 'Family (Woman, Woman, Girl, Girl)', f: 1, s: 'family_wwgg' }, { u: '1F468-1F468-1F466', e: '👨‍👨‍👦', n: 'Family (Man, Man, Boy)', f: 1, s: 'family_mmb' }, { u: '1F468-1F468-1F467', e: '👨‍👨‍👧', n: 'Family (Man, Man, Girl)', f: 1, s: 'family_mmg' }, { u: '1F468-1F468-1F467-1F466', e: '👨‍👨‍👧‍👦', n: 'Family (Man, Man, Girl, Boy)', f: 1, s: 'family_mmgb' }, { u: '1F468-1F468-1F466-1F466', e: '👨‍👨‍👦‍👦', n: 'Family (Man, Man, Boy, Boy)', f: 1, s: 'family_mmbb' }, { u: '1F468-1F468-1F467-1F467', e: '👨‍👨‍👧‍👧', n: 'Family (Man, Man, Girl, Girl)', f: 1, s: 'family_mmgg' }, { u: '1F45A', e: '👚', n: 'Womans Clothes', f: 1, s: 'womans_clothes' }, { u: '1F455', e: '👕', n: 'T-shirt', f: 1, s: 'shirt' }, { u: '1F456', e: '👖', n: 'Jeans', f: 1, s: 'jeans' }, { u: '1F454', e: '👔', n: 'Necktie', f: 1, s: 'necktie' }, { u: '1F457', e: '👗', n: 'Dress', f: 1, s: 'dress' }, { u: '1F459', e: '👙', n: 'Bikini', f: 1, s: 'bikini' }, { u: '1F458', e: '👘', n: 'Kimono', f: 1, s: 'kimono' }, { u: '1F484', e: '💄', n: 'Lipstick', f: 1, s: 'lipstick' }, { u: '1F48B', e: '💋', n: 'Kiss Mark', f: 1, s: 'kiss' }, { u: '1F463', e: '👣', n: 'Footprints', f: 1, s: 'footprints' }, { u: '1F460', e: '👠', n: 'High-heeled Shoe', f: 1, s: 'high_heel' }, { u: '1F461', e: '👡', n: 'Womans Sandal', f: 1, s: 'sandal' }, { u: '1F462', e: '👢', n: 'Womans Boots', f: 1, s: 'boot' }, { u: '1F45E', e: '👞', n: 'Mans Shoe', f: 1, s: 'mans_shoe' }, { u: '1F45F', e: '👟', n: 'Athletic Shoe', f: 1, s: 'athletic_shoe' }, { u: '1F452', e: '👒', n: 'Womans Hat', f: 1, s: 'womans_hat' }, { u: '1F3A9', e: '🎩', n: 'Top Hat', f: 1, s: 'tophat' }, { u: '26D1', e: '⛑', n: 'Helmet With White Cross', f: 1 }, { u: '1F393', e: '🎓', n: 'Graduation Cap', f: 1, s: 'mortar_board' }, { u: '1F451', e: '👑', n: 'Crown', f: 1, s: 'crown' }, { u: '1F392', e: '🎒', n: 'School Satchel', f: 1, s: 'school_satchel' }, { u: '1F45D', e: '👝', n: 'Pouch', f: 1, s: 'pouch' }, { u: '1F45B', e: '👛', n: 'Purse', f: 1, s: 'purse' }, { u: '1F45C', e: '👜', n: 'Handbag', f: 1, s: 'handbag' }, { u: '1F4BC', e: '💼', n: 'Briefcase', f: 1, s: 'briefcase' }, { u: '1F453', e: '👓', n: 'Eyeglasses', f: 1, s: 'eyeglasses' }, { u: '1F576', e: '🕶', n: 'Dark Sunglasses', f: 1, s: 'dark_sunglasses' }, { u: '1F48D', e: '💍', n: 'Ring', f: 1, s: 'ring' }, { u: '1F302', e: '🌂', n: 'Closed Umbrella', f: 1, s: 'closed_umbrella' }, { u: '1F436', e: '🐶', n: 'Dog Face', f: 2, s: 'dog' }, { u: '1F431', e: '🐱', n: 'Cat Face', f: 2, s: 'cat' }, { u: '1F42D', e: '🐭', n: 'Mouse Face', f: 2, s: 'mouse' }, { u: '1F439', e: '🐹', n: 'Hamster Face', f: 2, s: 'hamster' }, { u: '1F430', e: '🐰', n: 'Rabbit Face', f: 2, s: 'rabbit' }, { u: '1F43B', e: '🐻', n: 'Bear Face', f: 2, s: 'bear' }, { u: '1F43C', e: '🐼', n: 'Panda Face', f: 2, s: 'panda_face' }, { u: '1F428', e: '🐨', n: 'Koala', f: 2, s: 'koala' }, { u: '1F42F', e: '🐯', n: 'Tiger Face', f: 2, s: 'tiger' }, { u: '1F981', e: '🦁', n: 'Lion Face', f: 2 }, { u: '1F42E', e: '🐮', n: 'Cow Face', f: 2, s: 'cow' }, { u: '1F437', e: '🐷', n: 'Pig Face', f: 2, s: 'pig' }, { u: '1F43D', e: '🐽', n: 'Pig Nose', f: 2, s: 'pig_nose' }, { u: '1F438', e: '🐸', n: 'Frog Face', f: 2, s: 'frog' }, { u: '1F419', e: '🐙', n: 'Octopus', f: 2, s: 'octopus' }, { u: '1F435', e: '🐵', n: 'Monkey Face', f: 2, s: 'monkey_face' }, { u: '1F648', e: '🙈', n: 'See-no-evil Monkey', f: 2, s: 'see_no_evil' }, { u: '1F649', e: '🙉', n: 'Hear-no-evil Monkey', f: 2, s: 'hear_no_evil' }, { u: '1F64A', e: '🙊', n: 'Speak-no-evil Monkey', f: 2, s: 'speak_no_evil' }, { u: '1F412', e: '🐒', n: 'Monkey', f: 2, s: 'monkey' }, { u: '1F414', e: '🐔', n: 'Chicken', f: 2, s: 'chicken' }, { u: '1F427', e: '🐧', n: 'Penguin', f: 2, s: 'penguin' }, { u: '1F426', e: '🐦', n: 'Bird', f: 2, s: 'bird' }, { u: '1F424', e: '🐤', n: 'Baby Chick', f: 2, s: 'baby_chick' }, { u: '1F423', e: '🐣', n: 'Hatching Chick', f: 2, s: 'hatching_chick' }, { u: '1F425', e: '🐥', n: 'Front-facing Baby Chick', f: 2, s: 'hatched_chick' }, { u: '1F43A', e: '🐺', n: 'Wolf Face', f: 2, s: 'wolf' }, { u: '1F417', e: '🐗', n: 'Boar', f: 2, s: 'boar' }, { u: '1F434', e: '🐴', n: 'Horse Face', f: 2, s: 'horse' }, { u: '1F984', e: '🦄', n: 'Unicorn Face', f: 2 }, { u: '1F41D', e: '🐝', n: 'Honeybee', f: 2, s: 'bee' }, { u: '1F41B', e: '🐛', n: 'Bug', f: 2, s: 'bug' }, { u: '1F40C', e: '🐌', n: 'Snail', f: 2, s: 'snail' }, { u: '1F41E', e: '🐞', n: 'Lady Beetle', f: 2, s: 'beetle' }, { u: '1F41C', e: '🐜', n: 'Ant', f: 2, s: 'ant' }, { u: '1F577', e: '🕷', n: 'Spider', f: 2, s: 'spider' }, { u: '1F982', e: '🦂', n: 'Scorpion', f: 2 }, { u: '1F980', e: '🦀', n: 'Crab', f: 2 }, { u: '1F40D', e: '🐍', n: 'Snake', f: 2, s: 'snake' }, { u: '1F422', e: '🐢', n: 'Turtle', f: 2, s: 'turtle' }, { u: '1F420', e: '🐠', n: 'Tropical Fish', f: 2, s: 'tropical_fish' }, { u: '1F41F', e: '🐟', n: 'Fish', f: 2, s: 'fish' }, { u: '1F421', e: '🐡', n: 'Blowfish', f: 2, s: 'blowfish' }, { u: '1F42C', e: '🐬', n: 'Dolphin', f: 2, s: 'dolphin' }, { u: '1F433', e: '🐳', n: 'Spouting Whale', f: 2, s: 'whale' }, { u: '1F40B', e: '🐋', n: 'Whale', f: 2, s: 'whale2' }, { u: '1F40A', e: '🐊', n: 'Crocodile', f: 2, s: 'crocodile' }, { u: '1F406', e: '🐆', n: 'Leopard', f: 2, s: 'leopard' }, { u: '1F405', e: '🐅', n: 'Tiger', f: 2, s: 'tiger2' }, { u: '1F403', e: '🐃', n: 'Water Buffalo', f: 2, s: 'water_buffalo' }, { u: '1F402', e: '🐂', n: 'Ox', f: 2, s: 'ox' }, { u: '1F404', e: '🐄', n: 'Cow', f: 2, s: 'cow2' }, { u: '1F42A', e: '🐪', n: 'Dromedary Camel', f: 2, s: 'dromedary_camel' }, { u: '1F42B', e: '🐫', n: 'Bactrian Camel', f: 2, s: 'camel' }, { u: '1F418', e: '🐘', n: 'Elephant', f: 2, s: 'elephant' }, { u: '1F410', e: '🐐', n: 'Goat', f: 2, s: 'goat' }, { u: '1F40F', e: '🐏', n: 'Ram', f: 2, s: 'ram' }, { u: '1F411', e: '🐑', n: 'Sheep', f: 2, s: 'sheep' }, { u: '1F40E', e: '🐎', n: 'Horse', f: 2, s: 'racehorse' }, { u: '1F416', e: '🐖', n: 'Pig', f: 2, s: 'pig2' }, { u: '1F400', e: '🐀', n: 'Rat', f: 2, s: 'rat' }, { u: '1F401', e: '🐁', n: 'Mouse', f: 2, s: 'mouse2' }, { u: '1F413', e: '🐓', n: 'Rooster', f: 2, s: 'rooster' }, { u: '1F983', e: '🦃', n: 'Turkey', f: 2 }, { u: '1F54A', e: '🕊', n: 'Dove Of Peace', f: 2, s: 'dove' }, { u: '1F415', e: '🐕', n: 'Dog', f: 2, s: 'dog2' }, { u: '1F429', e: '🐩', n: 'Poodle', f: 2, s: 'poodle' }, { u: '1F408', e: '🐈', n: 'Cat', f: 2, s: 'cat2' }, { u: '1F407', e: '🐇', n: 'Rabbit', f: 2, s: 'rabbit2' }, { u: '1F43F', e: '🐿', n: 'Chipmunk', f: 2, s: 'chipmunk' }, { u: '1F43E', e: '🐾', n: 'Paw Prints', f: 2, s: 'feet' }, { u: '1F409', e: '🐉', n: 'Dragon', f: 2, s: 'dragon' }, { u: '1F432', e: '🐲', n: 'Dragon Face', f: 2, s: 'dragon_face' }, { u: '1F335', e: '🌵', n: 'Cactus', f: 2, s: 'cactus' }, { u: '1F384', e: '🎄', n: 'Christmas Tree', f: 2, s: 'christmas_tree' }, { u: '1F332', e: '🌲', n: 'Evergreen Tree', f: 2, s: 'evergreen_tree' }, { u: '1F333', e: '🌳', n: 'Deciduous Tree', f: 2, s: 'deciduous_tree' }, { u: '1F334', e: '🌴', n: 'Palm Tree', f: 2, s: 'palm_tree' }, { u: '1F331', e: '🌱', n: 'Seedling', f: 2, s: 'seedling' }, { u: '1F33F', e: '🌿', n: 'Herb', f: 2, s: 'herb' }, { u: '2618', e: '☘', n: 'Shamrock', f: 2 }, { u: '1F340', e: '🍀', n: 'Four Leaf Clover', f: 2, s: 'four_leaf_clover' }, { u: '1F38D', e: '🎍', n: 'Pine Decoration', f: 2, s: 'bamboo' }, { u: '1F38B', e: '🎋', n: 'Tanabata Tree', f: 2, s: 'tanabata_tree' }, { u: '1F343', e: '🍃', n: 'Leaf Fluttering In Wind', f: 2, s: 'leaves' }, { u: '1F342', e: '🍂', n: 'Fallen Leaf', f: 2, s: 'fallen_leaf' }, { u: '1F341', e: '🍁', n: 'Maple Leaf', f: 2, s: 'maple_leaf' }, { u: '1F33E', e: '🌾', n: 'Ear Of Rice', f: 2, s: 'ear_of_rice' }, { u: '1F33A', e: '🌺', n: 'Hibiscus', f: 2, s: 'hibiscus' }, { u: '1F33B', e: '🌻', n: 'Sunflower', f: 2, s: 'sunflower' }, { u: '1F339', e: '🌹', n: 'Rose', f: 2, s: 'rose' }, { u: '1F337', e: '🌷', n: 'Tulip', f: 2, s: 'tulip' }, { u: '1F33C', e: '🌼', n: 'Blossom', f: 2, s: 'blossom' }, { u: '1F338', e: '🌸', n: 'Cherry Blossom', f: 2, s: 'cherry_blossom' }, { u: '1F490', e: '💐', n: 'Bouquet', f: 2, s: 'bouquet' }, { u: '1F344', e: '🍄', n: 'Mushroom', f: 2, s: 'mushroom' }, { u: '1F330', e: '🌰', n: 'Chestnut', f: 2, s: 'chestnut' }, { u: '1F383', e: '🎃', n: 'Jack-o-lantern', f: 2, s: 'jack_o_lantern' }, { u: '1F41A', e: '🐚', n: 'Spiral Shell', f: 2, s: 'shell' }, { u: '1F578', e: '🕸', n: 'Spider Web', f: 2, s: 'spider_web' }, { u: '1F30E', e: '🌎', n: 'Earth Globe Americas', f: 2, s: 'earth_americas' }, { u: '1F30D', e: '🌍', n: 'Earth Globe Europe-africa', f: 2, s: 'earth_africa' }, { u: '1F30F', e: '🌏', n: 'Earth Globe Asia-australia', f: 2, s: 'earth_asia' }, { u: '1F315', e: '🌕', n: 'Full Moon Symbol', f: 2, s: 'full_moon' }, { u: '1F316', e: '🌖', n: 'Waning Gibbous Moon Symbol', f: 2, s: 'waning_gibbous_moon' }, { u: '1F317', e: '🌗', n: 'Last Quarter Moon Symbol', f: 2, s: 'last_quarter_moon' }, { u: '1F318', e: '🌘', n: 'Waning Crescent Moon Symbol', f: 2, s: 'waning_crescent_moon' }, { u: '1F311', e: '🌑', n: 'New Moon Symbol', f: 2, s: 'new_moon' }, { u: '1F312', e: '🌒', n: 'Waxing Crescent Moon Symbol', f: 2, s: 'waxing_crescent_moon' }, { u: '1F313', e: '🌓', n: 'First Quarter Moon Symbol', f: 2, s: 'first_quarter_moon' }, { u: '1F314', e: '🌔', n: 'Waxing Gibbous Moon Symbol', f: 2, s: 'waxing_gibbous_moon' }, { u: '1F31A', e: '🌚', n: 'New Moon With Face', f: 2, s: 'new_moon_with_face' }, { u: '1F31D', e: '🌝', n: 'Full Moon With Face', f: 2, s: 'full_moon_with_face' }, { u: '1F31B', e: '🌛', n: 'First Quarter Moon With Face', f: 2, s: 'first_quarter_moon_with_face' }, { u: '1F31C', e: '🌜', n: 'Last Quarter Moon With Face', f: 2, s: 'last_quarter_moon_with_face' }, { u: '1F31E', e: '🌞', n: 'Sun With Face', f: 2, s: 'sun_with_face' }, { u: '1F319', e: '🌙', n: 'Crescent Moon', f: 2, s: 'crescent_moon' }, { u: '2B50', e: '⭐️', n: 'White Medium Star', f: 2, s: 'star' }, { u: '1F31F', e: '🌟', n: 'Glowing Star', f: 2, s: 'star2' }, { u: '1F4AB', e: '💫', n: 'Dizzy Symbol', f: 2, s: 'dizzy' }, { u: '2728', e: '✨', n: 'Sparkles', f: 2, s: 'sparkles' }, { u: '2604', e: '☄', n: 'Comet', f: 2 }, { u: '2600', e: '☀️', n: 'Black Sun With Rays', f: 2, s: 'sunny' }, { u: '1F324', e: '🌤', n: 'White Sun With Small Cloud', f: 2 }, { u: '26C5', e: '⛅️', n: 'Sun Behind Cloud', f: 2, s: 'partly_sunny' }, { u: '1F325', e: '🌥', n: 'White Sun Behind Cloud', f: 2 }, { u: '1F326', e: '🌦', n: 'White Sun Behind Cloud With Rain', f: 2 }, { u: '2601', e: '☁️', n: 'Cloud', f: 2, s: 'cloud' }, { u: '1F327', e: '🌧', n: 'Cloud With Rain', f: 2, s: 'cloud_rain' }, { u: '26C8', e: '⛈', n: 'Thunder Cloud And Rain', f: 2 }, { u: '1F329', e: '🌩', n: 'Cloud With Lightning', f: 2, s: 'cloud_lightning' }, { u: '26A1', e: '⚡️', n: 'High Voltage Sign', f: 2, s: 'zap' }, { u: '1F525', e: '🔥', n: 'Fire', f: 2, s: 'fire' }, { u: '1F4A5', e: '💥', n: 'Collision Symbol', f: 2, s: 'boom' }, { u: '2744', e: '❄️', n: 'Snowflake', f: 2, s: 'snowflake' }, { u: '1F328', e: '🌨', n: 'Cloud With Snow', f: 2, s: 'cloud_snow' }, { u: '2603', e: '☃️', n: 'Snowman', f: 2 }, { u: '26C4', e: '⛄️', n: 'Snowman Without Snow', f: 2, s: 'snowman' }, { u: '1F32C', e: '🌬', n: 'Wind Blowing Face', f: 2, s: 'wind_blowing_face' }, { u: '1F4A8', e: '💨', n: 'Dash Symbol', f: 2, s: 'dash' }, { u: '1F32A', e: '🌪', n: 'Cloud With Tornado', f: 2, s: 'cloud_tornado' }, { u: '1F32B', e: '🌫', n: 'Fog', f: 2, s: 'fog' }, { u: '2602', e: '☂️', n: 'Umbrella', f: 2 }, { u: '2614', e: '☔️', n: 'Umbrella With Rain Drops', f: 2, s: 'umbrella' }, { u: '1F4A7', e: '💧', n: 'Droplet', f: 2, s: 'droplet' }, { u: '1F4A6', e: '💦', n: 'Splashing Sweat Symbol', f: 2, s: 'sweat_drops' }, { u: '1F30A', e: '🌊', n: 'Water Wave', f: 2, s: 'ocean' }, { u: '1F34F', e: '🍏', n: 'Green Apple', f: 3, s: 'green_apple' }, { u: '1F34E', e: '🍎', n: 'Red Apple', f: 3, s: 'apple' }, { u: '1F350', e: '🍐', n: 'Pear', f: 3, s: 'pear' }, { u: '1F34A', e: '🍊', n: 'Tangerine', f: 3, s: 'tangerine' }, { u: '1F34B', e: '🍋', n: 'Lemon', f: 3, s: 'lemon' }, { u: '1F34C', e: '🍌', n: 'Banana', f: 3, s: 'banana' }, { u: '1F349', e: '🍉', n: 'Watermelon', f: 3, s: 'watermelon' }, { u: '1F347', e: '🍇', n: 'Grapes', f: 3, s: 'grapes' }, { u: '1F353', e: '🍓', n: 'Strawberry', f: 3, s: 'strawberry' }, { u: '1F348', e: '🍈', n: 'Melon', f: 3, s: 'melon' }, { u: '1F352', e: '🍒', n: 'Cherries', f: 3, s: 'cherries' }, { u: '1F351', e: '🍑', n: 'Peach', f: 3, s: 'peach' }, { u: '1F34D', e: '🍍', n: 'Pineapple', f: 3, s: 'pineapple' }, { u: '1F345', e: '🍅', n: 'Tomato', f: 3, s: 'tomato' }, { u: '1F346', e: '🍆', n: 'Aubergine', f: 3, s: 'eggplant' }, { u: '1F336', e: '🌶', n: 'Hot Pepper', f: 3, s: 'hot_pepper' }, { u: '1F33D', e: '🌽', n: 'Ear Of Maize', f: 3, s: 'corn' }, { u: '1F360', e: '🍠', n: 'Roasted Sweet Potato', f: 3, s: 'sweet_potato' }, { u: '1F36F', e: '🍯', n: 'Honey Pot', f: 3, s: 'honey_pot' }, { u: '1F35E', e: '🍞', n: 'Bread', f: 3, s: 'bread' }, { u: '1F9C0', e: '🧀', n: 'Cheese Wedge', f: 3 }, { u: '1F357', e: '🍗', n: 'Poultry Leg', f: 3, s: 'poultry_leg' }, { u: '1F356', e: '🍖', n: 'Meat On Bone', f: 3, s: 'meat_on_bone' }, { u: '1F364', e: '🍤', n: 'Fried Shrimp', f: 3, s: 'fried_shrimp' }, { u: '1F373', e: '🍳', n: 'Cooking', f: 3, s: 'egg' }, { u: '1F354', e: '🍔', n: 'Hamburger', f: 3, s: 'hamburger' }, { u: '1F35F', e: '🍟', n: 'French Fries', f: 3, s: 'fries' }, { u: '1F32D', e: '🌭', n: 'Hot Dog', f: 3 }, { u: '1F355', e: '🍕', n: 'Slice Of Pizza', f: 3, s: 'pizza' }, { u: '1F35D', e: '🍝', n: 'Spaghetti', f: 3, s: 'spaghetti' }, { u: '1F32E', e: '🌮', n: 'Taco', f: 3 }, { u: '1F32F', e: '🌯', n: 'Burrito', f: 3 }, { u: '1F35C', e: '🍜', n: 'Steaming Bowl', f: 3, s: 'ramen' }, { u: '1F372', e: '🍲', n: 'Pot Of Food', f: 3, s: 'stew' }, { u: '1F365', e: '🍥', n: 'Fish Cake With Swirl Design', f: 3, s: 'fish_cake' }, { u: '1F363', e: '🍣', n: 'Sushi', f: 3, s: 'sushi' }, { u: '1F371', e: '🍱', n: 'Bento Box', f: 3, s: 'bento' }, { u: '1F35B', e: '🍛', n: 'Curry And Rice', f: 3, s: 'curry' }, { u: '1F359', e: '🍙', n: 'Rice Ball', f: 3, s: 'rice_ball' }, { u: '1F35A', e: '🍚', n: 'Cooked Rice', f: 3, s: 'rice' }, { u: '1F358', e: '🍘', n: 'Rice Cracker', f: 3, s: 'rice_cracker' }, { u: '1F362', e: '🍢', n: 'Oden', f: 3, s: 'oden' }, { u: '1F361', e: '🍡', n: 'Dango', f: 3, s: 'dango' }, { u: '1F367', e: '🍧', n: 'Shaved Ice', f: 3, s: 'shaved_ice' }, { u: '1F368', e: '🍨', n: 'Ice Cream', f: 3, s: 'ice_cream' }, { u: '1F366', e: '🍦', n: 'Soft Ice Cream', f: 3, s: 'icecream' }, { u: '1F370', e: '🍰', n: 'Shortcake', f: 3, s: 'cake' }, { u: '1F382', e: '🎂', n: 'Birthday Cake', f: 3, s: 'birthday' }, { u: '1F36E', e: '🍮', n: 'Custard', f: 3, s: 'custard' }, { u: '1F36C', e: '🍬', n: 'Candy', f: 3, s: 'candy' }, { u: '1F36D', e: '🍭', n: 'Lollipop', f: 3, s: 'lollipop' }, { u: '1F36B', e: '🍫', n: 'Chocolate Bar', f: 3, s: 'chocolate_bar' }, { u: '1F37F', e: '🍿', n: 'Popcorn', f: 3 }, { u: '1F369', e: '🍩', n: 'Doughnut', f: 3, s: 'doughnut' }, { u: '1F36A', e: '🍪', n: 'Cookie', f: 3, s: 'cookie' }, { u: '1F37A', e: '🍺', n: 'Beer Mug', f: 3, s: 'beer' }, { u: '1F37B', e: '🍻', n: 'Clinking Beer Mugs', f: 3, s: 'beers' }, { u: '1F377', e: '🍷', n: 'Wine Glass', f: 3, s: 'wine_glass' }, { u: '1F378', e: '🍸', n: 'Cocktail Glass', f: 3, s: 'cocktail' }, { u: '1F379', e: '🍹', n: 'Tropical Drink', f: 3, s: 'tropical_drink' }, { u: '1F37E', e: '🍾', n: 'Bottle With Popping Cork', f: 3 }, { u: '1F376', e: '🍶', n: 'Sake Bottle And Cup', f: 3, s: 'sake' }, { u: '1F375', e: '🍵', n: 'Teacup Without Handle', f: 3, s: 'tea' }, { u: '2615', e: '☕️', n: 'Hot Beverage', f: 3, s: 'coffee' }, { u: '1F37C', e: '🍼', n: 'Baby Bottle', f: 3, s: 'baby_bottle' }, { u: '1F374', e: '🍴', n: 'Fork And Knife', f: 3, s: 'fork_and_knife' }, { u: '1F37D', e: '🍽', n: 'Fork And Knife With Plate', f: 3, s: 'fork_knife_plate' }, { u: '26BD', e: '⚽️', n: 'Soccer Ball', f: 4, s: 'soccer' }, { u: '1F3C0', e: '🏀', n: 'Basketball And Hoop', f: 4, s: 'basketball' }, { u: '1F3C8', e: '🏈', n: 'American Football', f: 4, s: 'football' }, { u: '26BE', e: '⚾️', n: 'Baseball', f: 4, s: 'baseball' }, { u: '1F3BE', e: '🎾', n: 'Tennis Racquet And Ball', f: 4, s: 'tennis' }, { u: '1F3D0', e: '🏐', n: 'Volleyball', f: 4 }, { u: '1F3C9', e: '🏉', n: 'Rugby Football', f: 4, s: 'rugby_football' }, { u: '1F3B1', e: '🎱', n: 'Billiards', f: 4, s: '8ball' }, { u: '26F3', e: '⛳️', n: 'Flag In Hole', f: 4, s: 'golf' }, { u: '1F3CC', e: '🏌', n: 'Golfer', f: 4, s: 'golfer' }, { u: '1F3D3', e: '🏓', n: 'Table Tennis Paddle And Ball', f: 4 }, { u: '1F3F8', e: '🏸', n: 'Badminton Racquet And Shuttlecock', f: 4 }, { u: '1F3D2', e: '🏒', n: 'Ice Hockey Stick And Puck', f: 4 }, { u: '1F3D1', e: '🏑', n: 'Field Hockey Stick And Ball', f: 4 }, { u: '1F3CF', e: '🏏', n: 'Cricket Bat And Ball', f: 4 }, { u: '1F3BF', e: '🎿', n: 'Ski And Ski Boot', f: 4, s: 'ski' }, { u: '26F7', e: '⛷', n: 'Skier', f: 4 }, { u: '1F3C2', e: '🏂', n: 'Snowboarder', f: 4, s: 'snowboarder' }, { u: '26F8', e: '⛸', n: 'Ice Skate', f: 4 }, { u: '1F3F9', e: '🏹', n: 'Bow And Arrow', f: 4 }, { u: '1F3A3', e: '🎣', n: 'Fishing Pole And Fish', f: 4, s: 'fishing_pole_and_fish' }, { u: '1F6A3', e: '🚣', n: 'Rowboat', f: 4, s: 'rowboat' }, { u: '1F6A3-1F3FB', e: '🚣🏻', n: 'Rowboat' + _mod + '1-2', f: 4, s: 'rowboat' }, { u: '1F6A3-1F3FC', e: '🚣🏼', n: 'Rowboat' + _mod + '3', f: 4, s: 'rowboat' }, { u: '1F6A3-1F3FD', e: '🚣🏽', n: 'Rowboat' + _mod + '4', f: 4, s: 'rowboat' }, { u: '1F6A3-1F3FE', e: '🚣🏾', n: 'Rowboat' + _mod + '5', f: 4, s: 'rowboat' }, { u: '1F6A3-1F3FF', e: '🚣🏿', n: 'Rowboat' + _mod + '6', f: 4, s: 'rowboat' }, { u: '1F3CA', e: '🏊', n: 'Swimmer', f: 4, s: 'swimmer' }, { u: '1F3CA-1F3FB', e: '🏊🏻', n: 'Swimmer' + _mod + '1-2', f: 4, s: 'swimmer' }, { u: '1F3CA-1F3FC', e: '🏊🏼', n: 'Swimmer' + _mod + '3', f: 4, s: 'swimmer' }, { u: '1F3CA-1F3FD', e: '🏊🏽', n: 'Swimmer' + _mod + '4', f: 4, s: 'swimmer' }, { u: '1F3CA-1F3FE', e: '🏊🏾', n: 'Swimmer' + _mod + '5', f: 4, s: 'swimmer' }, { u: '1F3CA-1F3FF', e: '🏊🏿', n: 'Swimmer' + _mod + '6', f: 4, s: 'swimmer' }, { u: '1F3C4-1F3FB', e: '🏄🏻', n: 'Surfer' + _mod + '1-2', f: 4, s: 'surfer' }, { u: '1F3C4', e: '🏄', n: 'Surfer', f: 4, s: 'surfer' }, { u: '1F3C4-1F3FC', e: '🏄🏼', n: 'Surfer' + _mod + '3', f: 4, s: 'surfer' }, { u: '1F3C4-1F3FD', e: '🏄🏽', n: 'Surfer' + _mod + '4', f: 4, s: 'surfer' }, { u: '1F3C4-1F3FE', e: '🏄🏾', n: 'Surfer' + _mod + '5', f: 4, s: 'surfer' }, { u: '1F3C4-1F3FF', e: '🏄🏿', n: 'Surfer' + _mod + '6', f: 4, s: 'surfer' }, { u: '1F6C0', e: '🛀', n: 'Bath', f: 4, s: 'bath' }, { u: '1F6C0-1F3FB', e: '🛀🏻', n: 'Bath' + _mod + '1-2', f: 4, s: 'bath' }, { u: '1F6C0-1F3FC', e: '🛀🏼', n: 'Bath' + _mod + '3', f: 4, s: 'bath' }, { u: '1F6C0-1F3FD', e: '🛀🏽', n: 'Bath' + _mod + '4', f: 4, s: 'bath' }, { u: '1F6C0-1F3FE', e: '🛀🏾', n: 'Bath' + _mod + '5', f: 4, s: 'bath' }, { u: '1F6C0-1F3FF', e: '🛀🏿', n: 'Bath' + _mod + '6', f: 4, s: 'bath' }, { u: '26F9', e: '⛹', n: 'Person With Ball', f: 4 }, { u: '26F9-1F3FB', e: '⛹🏻', n: 'Person With Ball' + _mod + '1-2', f: 4 }, { u: '26F9-1F3FC', e: '⛹🏼', n: 'Person With Ball' + _mod + '3', f: 4 }, { u: '26F9-1F3FD', e: '⛹🏽', n: 'Person With Ball' + _mod + '4', f: 4 }, { u: '26F9-1F3FE', e: '⛹🏾', n: 'Person With Ball' + _mod + '5', f: 4 }, { u: '26F9-1F3FF', e: '⛹🏿', n: 'Person With Ball' + _mod + '6', f: 4 }, { u: '1F3CB', e: '🏋', n: 'Weight Lifter', f: 4, s: 'lifter' }, { u: '1F3CB-1F3FB', e: '🏋🏻', n: 'Weight Lifter' + _mod + '1-2', f: 4, s: 'lifter' }, { u: '1F3CB-1F3FC', e: '🏋🏼', n: 'Weight Lifter' + _mod + '3', f: 4, s: 'lifter' }, { u: '1F3CB-1F3FD', e: '🏋🏽', n: 'Weight Lifter' + _mod + '4', f: 4, s: 'lifter' }, { u: '1F3CB-1F3FE', e: '🏋🏾', n: 'Weight Lifter' + _mod + '5', f: 4, s: 'lifter' }, { u: '1F3CB-1F3FF', e: '🏋🏿', n: 'Weight Lifter' + _mod + '6', f: 4, s: 'lifter' }, { u: '1F6B4-1F3FB', e: '🚴🏻', n: 'Bicyclist' + _mod + '1-2', f: 4, s: 'bicyclist' }, { u: '1F6B4', e: '🚴', n: 'Bicyclist', f: 4, s: 'bicyclist' }, { u: '1F6B4-1F3FC', e: '🚴🏼', n: 'Bicyclist' + _mod + '3', f: 4, s: 'bicyclist' }, { u: '1F6B4-1F3FD', e: '🚴🏽', n: 'Bicyclist' + _mod + '4', f: 4, s: 'bicyclist' }, { u: '1F6B4-1F3FE', e: '🚴🏾', n: 'Bicyclist' + _mod + '5', f: 4, s: 'bicyclist' }, { u: '1F6B4-1F3FF', e: '🚴🏿', n: 'Bicyclist' + _mod + '6', f: 4, s: 'bicyclist' }, { u: '1F6B5-1F3FB', e: '🚵🏻', n: 'Mountain Bicyclist' + _mod + '1-2', f: 4, s: 'mountain_bicyclist' }, { u: '1F6B5', e: '🚵', n: 'Mountain Bicyclist', f: 4, s: 'mountain_bicyclist' }, { u: '1F6B5-1F3FC', e: '🚵🏼', n: 'Mountain Bicyclist' + _mod + '3', f: 4, s: 'mountain_bicyclist' }, { u: '1F6B5-1F3FD', e: '🚵🏽', n: 'Mountain Bicyclist' + _mod + '4', f: 4, s: 'mountain_bicyclist' }, { u: '1F6B5-1F3FE', e: '🚵🏾', n: 'Mountain Bicyclist' + _mod + '5', f: 4, s: 'mountain_bicyclist' }, { u: '1F6B5-1F3FF', e: '🚵🏿', n: 'Mountain Bicyclist' + _mod + '6', f: 4, s: 'mountain_bicyclist' }, { u: '1F3C7-1F3FB', e: '🏇🏻', n: 'Horse Racing' + _mod + '1-2', f: 4, s: 'horse_racing' }, { u: '1F3C7', e: '🏇', n: 'Horse Racing', f: 4, s: 'horse_racing' }, { u: '1F3C7-1F3FC', e: '🏇🏼', n: 'Horse Racing' + _mod + '3', f: 4, s: 'horse_racing' }, { u: '1F3C7-1F3FD', e: '🏇🏽', n: 'Horse Racing' + _mod + '4', f: 4, s: 'horse_racing' }, { u: '1F3C7-1F3FE', e: '🏇🏾', n: 'Horse Racing' + _mod + '5', f: 4, s: 'horse_racing' }, { u: '1F3C7-1F3FF', e: '🏇🏿', n: 'Horse Racing' + _mod + '6', f: 4, s: 'horse_racing' }, { u: '1F574', e: '🕴', n: 'Man In Business Suit Levitating', f: 4, s: 'levitate' }, { u: '1F3C6', e: '🏆', n: 'Trophy', f: 4, s: 'trophy' }, { u: '1F3BD', e: '🎽', n: 'Running Shirt With Sash', f: 4, s: 'running_shirt_with_sash' }, { u: '1F3C5', e: '🏅', n: 'Sports Medal', f: 4, s: 'medal' }, { u: '1F396', e: '🎖', n: 'Military Medal', f: 4, s: 'military_medal' }, { u: '1F397', e: '🎗', n: 'Reminder Ribbon', f: 4, s: 'reminder_ribbon' }, { u: '1F3F5', e: '🏵', n: 'Rosette', f: 4, s: 'rosette' }, { u: '1F3AB', e: '🎫', n: 'Ticket', f: 4, s: 'ticket' }, { u: '1F39F', e: '🎟', n: 'Admission Tickets', f: 4, s: 'tickets' }, { u: '1F3AD', e: '🎭', n: 'Performing Arts', f: 4, s: 'performing_arts' }, { u: '1F3A8', e: '🎨', n: 'Artist Palette', f: 4, s: 'art' }, { u: '1F3AA', e: '🎪', n: 'Circus Tent', f: 4, s: 'circus_tent' }, { u: '1F3A4', e: '🎤', n: 'Microphone', f: 4, s: 'microphone' }, { u: '1F3A7', e: '🎧', n: 'Headphone', f: 4, s: 'headphones' }, { u: '1F3BC', e: '🎼', n: 'Musical Score', f: 4, s: 'musical_score' }, { u: '1F3B9', e: '🎹', n: 'Musical Keyboard', f: 4, s: 'musical_keyboard' }, { u: '1F3B7', e: '🎷', n: 'Saxophone', f: 4, s: 'saxophone' }, { u: '1F3BA', e: '🎺', n: 'Trumpet', f: 4, s: 'trumpet' }, { u: '1F3B8', e: '🎸', n: 'Guitar', f: 4, s: 'guitar' }, { u: '1F3BB', e: '🎻', n: 'Violin', f: 4, s: 'violin' }, { u: '1F3AC', e: '🎬', n: 'Clapper Board', f: 4, s: 'clapper' }, { u: '1F3AE', e: '🎮', n: 'Video Game', f: 4, s: 'video_game' }, { u: '1F47E', e: '👾', n: 'Alien Monster', f: 4, s: 'space_invader' }, { u: '1F3AF', e: '🎯', n: 'Direct Hit', f: 4, s: 'dart' }, { u: '1F3B2', e: '🎲', n: 'Game Die', f: 4, s: 'game_die' }, { u: '1F3B0', e: '🎰', n: 'Slot Machine', f: 4, s: 'slot_machine' }, { u: '1F3B3', e: '🎳', n: 'Bowling', f: 4, s: 'bowling' }, { u: '1F697', e: '🚗', n: 'Automobile', f: 5, s: 'red_car' }, { u: '1F695', e: '🚕', n: 'Taxi', f: 5, s: 'taxi' }, { u: '1F699', e: '🚙', n: 'Recreational Vehicle', f: 5, s: 'blue_car' }, { u: '1F68C', e: '🚌', n: 'Bus', f: 5, s: 'bus' }, { u: '1F68E', e: '🚎', n: 'Trolleybus', f: 5, s: 'trolleybus' }, { u: '1F3CE', e: '🏎', n: 'Racing Car', f: 5, s: 'race_car' }, { u: '1F693', e: '🚓', n: 'Police Car', f: 5, s: 'police_car' }, { u: '1F691', e: '🚑', n: 'Ambulance', f: 5, s: 'ambulance' }, { u: '1F692', e: '🚒', n: 'Fire Engine', f: 5, s: 'fire_engine' }, { u: '1F690', e: '🚐', n: 'Minibus', f: 5, s: 'minibus' }, { u: '1F69A', e: '🚚', n: 'Delivery Truck', f: 5, s: 'truck' }, { u: '1F69B', e: '🚛', n: 'Articulated Lorry', f: 5, s: 'articulated_lorry' }, { u: '1F69C', e: '🚜', n: 'Tractor', f: 5, s: 'tractor' }, { u: '1F3CD', e: '🏍', n: 'Racing Motorcycle', f: 5, s: 'motorcycle' }, { u: '1F6B2', e: '🚲', n: 'Bicycle', f: 5, s: 'bike' }, { u: '1F6A8', e: '🚨', n: 'Police Cars Revolving Light', f: 5, s: 'rotating_light' }, { u: '1F694', e: '🚔', n: 'Oncoming Police Car', f: 5, s: 'oncoming_police_car' }, { u: '1F68D', e: '🚍', n: 'Oncoming Bus', f: 5, s: 'oncoming_bus' }, { u: '1F698', e: '🚘', n: 'Oncoming Automobile', f: 5, s: 'oncoming_automobile' }, { u: '1F696', e: '🚖', n: 'Oncoming Taxi', f: 5, s: 'oncoming_taxi' }, { u: '1F6A1', e: '🚡', n: 'Aerial Tramway', f: 5, s: 'aerial_tramway' }, { u: '1F6A0', e: '🚠', n: 'Mountain Cableway', f: 5, s: 'mountain_cableway' }, { u: '1F69F', e: '🚟', n: 'Suspension Railway', f: 5, s: 'suspension_railway' }, { u: '1F683', e: '🚃', n: 'Railway Car', f: 5, s: 'railway_car' }, { u: '1F68B', e: '🚋', n: 'Tram Car', f: 5, s: 'train' }, { u: '1F69D', e: '🚝', n: 'Monorail', f: 5, s: 'monorail' }, { u: '1F684', e: '🚄', n: 'High-speed Train', f: 5, s: 'bullettrain_side' }, { u: '1F685', e: '🚅', n: 'High-speed Train With Bullet Nose', f: 5, s: 'bullettrain_front' }, { u: '1F688', e: '🚈', n: 'Light Rail', f: 5, s: 'light_rail' }, { u: '1F69E', e: '🚞', n: 'Mountain Railway', f: 5, s: 'mountain_railway' }, { u: '1F682', e: '🚂', n: 'Steam Locomotive', f: 5, s: 'steam_locomotive' }, { u: '1F686', e: '🚆', n: 'Train', f: 5, s: 'train2' }, { u: '1F687', e: '🚇', n: 'Metro', f: 5, s: 'metro' }, { u: '1F68A', e: '🚊', n: 'Tram', f: 5, s: 'tram' }, { u: '1F689', e: '🚉', n: 'Station', f: 5, s: 'station' }, { u: '1F681', e: '🚁', n: 'Helicopter', f: 5, s: 'helicopter' }, { u: '1F6E9', e: '🛩', n: 'Small Airplane', f: 5, s: 'airplane_small' }, { u: '2708', e: '✈️', n: 'Airplane', f: 5, s: 'airplane' }, { u: '1F6EB', e: '🛫', n: 'Airplane Departure', f: 5, s: 'airplane_departure' }, { u: '1F6EC', e: '🛬', n: 'Airplane Arriving', f: 5, s: 'airplane_arriving' }, { u: '26F5', e: '⛵️', n: 'Sailboat', f: 5, s: 'sailboat' }, { u: '1F6E5', e: '🛥', n: 'Motor Boat', f: 5, s: 'motorboat' }, { u: '1F6A4', e: '🚤', n: 'Speedboat', f: 5, s: 'speedboat' }, { u: '26F4', e: '⛴', n: 'Ferry', f: 5 }, { u: '1F6F3', e: '🛳', n: 'Passenger Ship', f: 5, s: 'cruise_ship' }, { u: '1F680', e: '🚀', n: 'Rocket', f: 5, s: 'rocket' }, { u: '1F6F0', e: '🛰', n: 'Satellite', f: 5, s: 'satellite_orbital' }, { u: '1F4BA', e: '💺', n: 'Seat', f: 5, s: 'seat' }, { u: '2693', e: '⚓️', n: 'Anchor', f: 5, s: 'anchor' }, { u: '1F6A7', e: '🚧', n: 'Construction Sign', f: 5, s: 'construction' }, { u: '26FD', e: '⛽️', n: 'Fuel Pump', f: 5, s: 'fuelpump' }, { u: '1F68F', e: '🚏', n: 'Bus Stop', f: 5, s: 'busstop' }, { u: '1F6A6', e: '🚦', n: 'Vertical Traffic Light', f: 5, s: 'vertical_traffic_light' }, { u: '1F6A5', e: '🚥', n: 'Horizontal Traffic Light', f: 5, s: 'traffic_light' }, { u: '1F3C1', e: '🏁', n: 'Chequered Flag', f: 5, s: 'checkered_flag' }, { u: '1F6A2', e: '🚢', n: 'Ship', f: 5, s: 'ship' }, { u: '1F3A1', e: '🎡', n: 'Ferris Wheel', f: 5, s: 'ferris_wheel' }, { u: '1F3A2', e: '🎢', n: 'Roller Coaster', f: 5, s: 'roller_coaster' }, { u: '1F3A0', e: '🎠', n: 'Carousel Horse', f: 5, s: 'carousel_horse' }, { u: '1F3D7', e: '🏗', n: 'Building Construction', f: 5, s: 'contruction_site' }, { u: '1F301', e: '🌁', n: 'Foggy', f: 5, s: 'foggy' }, { u: '1F5FC', e: '🗼', n: 'Tokyo Tower', f: 5, s: 'tokyo_tower' }, { u: '1F3ED', e: '🏭', n: 'Factory', f: 5, s: 'factory' }, { u: '26F2', e: '⛲️', n: 'Fountain', f: 5, s: 'fountain' }, { u: '1F391', e: '🎑', n: 'Moon Viewing Ceremony', f: 5, s: 'rice_scene' }, { u: '26F0', e: '⛰', n: 'Mountain', f: 5 }, { u: '1F3D4', e: '🏔', n: 'Snow Capped Mountain', f: 5, s: 'mountain_snow' }, { u: '1F5FB', e: '🗻', n: 'Mount Fuji', f: 5, s: 'mount_fuji' }, { u: '1F30B', e: '🌋', n: 'Volcano', f: 5, s: 'volcano' }, { u: '1F5FE', e: '🗾', n: 'Silhouette Of Japan', f: 5, s: 'japan' }, { u: '1F3D5', e: '🏕', n: 'Camping', f: 5, s: 'camping' }, { u: '26FA', e: '⛺️', n: 'Tent', f: 5, s: 'tent' }, { u: '1F3DE', e: '🏞', n: 'National Park', f: 5, s: 'park' }, { u: '1F6E3', e: '🛣', n: 'Motorway', f: 5, s: 'motorway' }, { u: '1F6E4', e: '🛤', n: 'Railway Track', f: 5, s: 'railway_track' }, { u: '1F305', e: '🌅', n: 'Sunrise', f: 5, s: 'sunrise' }, { u: '1F304', e: '🌄', n: 'Sunrise Over Mountains', f: 5, s: 'sunrise_over_mountains' }, { u: '1F3DC', e: '🏜', n: 'Desert', f: 5, s: 'desert' }, { u: '1F3D6', e: '🏖', n: 'Beach With Umbrella', f: 5, s: 'beach' }, { u: '1F3DD', e: '🏝', n: 'Desert Island', f: 5, s: 'island' }, { u: '1F307', e: '🌇', n: 'Sunset Over Buildings', f: 5, s: 'city_sunset' }, { u: '1F306', e: '🌆', n: 'Cityscape At Dusk', f: 5, s: 'city_dusk' }, { u: '1F3D9', e: '🏙', n: 'Cityscape', f: 5, s: 'cityscape' }, { u: '1F303', e: '🌃', n: 'Night With Stars', f: 5, s: 'night_with_stars' }, { u: '1F309', e: '🌉', n: 'Bridge At Night', f: 5, s: 'bridge_at_night' }, { u: '1F30C', e: '🌌', n: 'Milky Way', f: 5, s: 'milky_way' }, { u: '1F320', e: '🌠', n: 'Shooting Star', f: 5, s: 'stars' }, { u: '1F387', e: '🎇', n: 'Firework Sparkler', f: 5, s: 'sparkler' }, { u: '1F386', e: '🎆', n: 'Fireworks', f: 5, s: 'fireworks' }, { u: '1F308', e: '🌈', n: 'Rainbow', f: 5, s: 'rainbow' }, { u: '1F3D8', e: '🏘', n: 'House Buildings', f: 5, s: 'homes' }, { u: '1F3F0', e: '🏰', n: 'European Castle', f: 5, s: 'european_castle' }, { u: '1F3EF', e: '🏯', n: 'Japanese Castle', f: 5, s: 'japanese_castle' }, { u: '1F3DF', e: '🏟', n: 'Stadium', f: 5, s: 'stadium' }, { u: '1F5FD', e: '🗽', n: 'Statue Of Liberty', f: 5, s: 'statue_of_liberty' }, { u: '1F3E0', e: '🏠', n: 'House Building', f: 5, s: 'house' }, { u: '1F3E1', e: '🏡', n: 'House With Garden', f: 5, s: 'house_with_garden' }, { u: '1F3DA', e: '🏚', n: 'Derelict House Building', f: 5, s: 'house_abandoned' }, { u: '1F3E2', e: '🏢', n: 'Office Building', f: 5, s: 'office' }, { u: '1F3EC', e: '🏬', n: 'Department Store', f: 5, s: 'department_store' }, { u: '1F3E3', e: '🏣', n: 'Japanese Post Office', f: 5, s: 'post_office' }, { u: '1F3E4', e: '🏤', n: 'European Post Office', f: 5, s: 'european_post_office' }, { u: '1F3E5', e: '🏥', n: 'Hospital', f: 5, s: 'hospital' }, { u: '1F3E6', e: '🏦', n: 'Bank', f: 5, s: 'bank' }, { u: '1F3E8', e: '🏨', n: 'Hotel', f: 5, s: 'hotel' }, { u: '1F3EA', e: '🏪', n: 'Convenience Store', f: 5, s: 'convenience_store' }, { u: '1F3EB', e: '🏫', n: 'School', f: 5, s: 'school' }, { u: '1F3E9', e: '🏩', n: 'Love Hotel', f: 5, s: 'love_hotel' }, { u: '1F492', e: '💒', n: 'Wedding', f: 5, s: 'wedding' }, { u: '1F3DB', e: '🏛', n: 'Classical Building', f: 5, s: 'classical_building' }, { u: '26EA', e: '⛪️', n: 'Church', f: 5, s: 'church' }, { u: '1F54C', e: '🕌', n: 'Mosque', f: 5 }, { u: '1F54D', e: '🕍', n: 'Synagogue', f: 5 }, { u: '1F54B', e: '🕋', n: 'Kaaba', f: 5 }, { u: '26E9', e: '⛩', n: 'Shinto Shrine', f: 5 }, { u: '231A', e: '⌚️', n: 'Watch', f: 6, s: 'watch' }, { u: '1F4F1', e: '📱', n: 'Mobile Phone', f: 6, s: 'iphone' }, { u: '1F4F2', e: '📲', n: 'Mobile Phone With Rightwards Arrow At Left', f: 6, s: 'calling' }, { u: '1F4BB', e: '💻', n: 'Personal Computer', f: 6, s: 'computer' }, { u: '2328', e: '⌨', n: 'Keyboard', f: 6 }, { u: '1F5A5', e: '🖥', n: 'Desktop Computer', f: 6, s: 'desktop' }, { u: '1F5A8', e: '🖨', n: 'Printer', f: 6, s: 'printer' }, { u: '1F5B1', e: '🖱', n: 'Three Button Mouse', f: 6 }, { u: '1F5B2', e: '🖲', n: 'Trackball', f: 6, s: 'trackball' }, { u: '1F579', e: '🕹', n: 'Joystick', f: 6, s: 'joystick' }, { u: '1F5DC', e: '🗜', n: 'Compression', f: 6, s: 'compression' }, { u: '1F4BD', e: '💽', n: 'Minidisc', f: 6, s: 'minidisc' }, { u: '1F4BE', e: '💾', n: 'Floppy Disk', f: 6, s: 'floppy_disk' }, { u: '1F4BF', e: '💿', n: 'Optical Disc', f: 6, s: 'cd' }, { u: '1F4C0', e: '📀', n: 'Dvd', f: 6, s: 'dvd' }, { u: '1F4FC', e: '📼', n: 'Videocassette', f: 6, s: 'vhs' }, { u: '1F4F7', e: '📷', n: 'Camera', f: 6, s: 'camera' }, { u: '1F4F8', e: '📸', n: 'Camera With Flash', f: 6, s: 'camera_with_flash' }, { u: '1F4F9', e: '📹', n: 'Video Camera', f: 6, s: 'video_camera' }, { u: '1F3A5', e: '🎥', n: 'Movie Camera', f: 6, s: 'movie_camera' }, { u: '1F4FD', e: '📽', n: 'Film Projector', f: 6, s: 'projector' }, { u: '1F39E', e: '🎞', n: 'Film Frames', f: 6, s: 'film_frames' }, { u: '1F4DE', e: '📞', n: 'Telephone Receiver', f: 6, s: 'telephone_receiver' }, { u: '260E', e: '☎️', n: 'Black Telephone', f: 6, s: 'telephone' }, { u: '1F4DF', e: '📟', n: 'Pager', f: 6, s: 'pager' }, { u: '1F4E0', e: '📠', n: 'Fax Machine', f: 6, s: 'fax' }, { u: '1F4FA', e: '📺', n: 'Television', f: 6, s: 'tv' }, { u: '1F4FB', e: '📻', n: 'Radio', f: 6, s: 'radio' }, { u: '1F399', e: '🎙', n: 'Studio Microphone', f: 6, s: 'microphone2' }, { u: '1F39A', e: '🎚', n: 'Level Slider', f: 6, s: 'level_slider' }, { u: '1F39B', e: '🎛', n: 'Control Knobs', f: 6, s: 'control_knobs' }, { u: '23F1', e: '⏱', n: 'Stopwatch', f: 6 }, { u: '23F2', e: '⏲', n: 'Timer Clock', f: 6 }, { u: '23F0', e: '⏰', n: 'Alarm Clock', f: 6, s: 'alarm_clock' }, { u: '1F570', e: '🕰', n: 'Mantelpiece Clock', f: 6, s: 'clock' }, { u: '23F3', e: '⏳', n: 'Hourglass With Flowing Sand', f: 6, s: 'hourglass_flowing_sand' }, { u: '231B', e: '⌛️', n: 'Hourglass', f: 6, s: 'hourglass' }, { u: '1F4E1', e: '📡', n: 'Satellite Antenna', f: 6, s: 'satellite' }, { u: '1F50B', e: '🔋', n: 'Battery', f: 6, s: 'battery' }, { u: '1F50C', e: '🔌', n: 'Electric Plug', f: 6, s: 'electric_plug' }, { u: '1F4A1', e: '💡', n: 'Electric Light Bulb', f: 6, s: 'bulb' }, { u: '1F526', e: '🔦', n: 'Electric Torch', f: 6, s: 'flashlight' }, { u: '1F56F', e: '🕯', n: 'Candle', f: 6, s: 'candle' }, { u: '1F5D1', e: '🗑', n: 'Wastebasket', f: 6, s: 'wastebasket' }, { u: '1F6E2', e: '🛢', n: 'Oil Drum', f: 6, s: 'oil' }, { u: '1F4B8', e: '💸', n: 'Money With Wings', f: 6, s: 'money_with_wings' }, { u: '1F4B5', e: '💵', n: 'Banknote With Dollar Sign', f: 6, s: 'dollar' }, { u: '1F4B4', e: '💴', n: 'Banknote With Yen Sign', f: 6, s: 'yen' }, { u: '1F4B6', e: '💶', n: 'Banknote With Euro Sign', f: 6, s: 'euro' }, { u: '1F4B7', e: '💷', n: 'Banknote With Pound Sign', f: 6, s: 'pound' }, { u: '1F4B0', e: '💰', n: 'Money Bag', f: 6, s: 'moneybag' }, { u: '1F4B3', e: '💳', n: 'Credit Card', f: 6, s: 'credit_card' }, { u: '1F48E', e: '💎', n: 'Gem Stone', f: 6, s: 'gem' }, { u: '2696', e: '⚖', n: 'Scales', f: 6 }, { u: '1F527', e: '🔧', n: 'Wrench', f: 6, s: 'wrench' }, { u: '1F528', e: '🔨', n: 'Hammer', f: 6, s: 'hammer' }, { u: '2692', e: '⚒', n: 'Hammer And Pick', f: 6 }, { u: '1F6E0', e: '🛠', n: 'Hammer And Wrench', f: 6, s: 'tools' }, { u: '26CF', e: '⛏', n: 'Pick', f: 6 }, { u: '1F529', e: '🔩', n: 'Nut And Bolt', f: 6, s: 'nut_and_bolt' }, { u: '2699', e: '⚙', n: 'Gear', f: 6 }, { u: '26D3', e: '⛓', n: 'Chains', f: 6 }, { u: '1F52B', e: '🔫', n: 'Pistol', f: 6, s: 'gun' }, { u: '1F4A3', e: '💣', n: 'Bomb', f: 6, s: 'bomb' }, { u: '1F52A', e: '🔪', n: 'Hocho', f: 6, s: 'knife' }, { u: '1F5E1', e: '🗡', n: 'Dagger Knife', f: 6, s: 'dagger' }, { u: '2694', e: '⚔', n: 'Crossed Swords', f: 6 }, { u: '1F6E1', e: '🛡', n: 'Shield', f: 6, s: 'shield' }, { u: '1F6AC', e: '🚬', n: 'Smoking Symbol', f: 6, s: 'smoking' }, { u: '2620', e: '☠', n: 'Skull And Crossbones', f: 6 }, { u: '26B0', e: '⚰', n: 'Coffin', f: 6 }, { u: '26B1', e: '⚱', n: 'Funeral Urn', f: 6 }, { u: '1F3FA', e: '🏺', n: 'Amphora', f: 6 }, { u: '1F52E', e: '🔮', n: 'Crystal Ball', f: 6, s: 'crystal_ball' }, { u: '1F4FF', e: '📿', n: 'Prayer Beads', f: 6 }, { u: '1F488', e: '💈', n: 'Barber Pole', f: 6, s: 'barber' }, { u: '2697', e: '⚗', n: 'Alembic', f: 6 }, { u: '1F52D', e: '🔭', n: 'Telescope', f: 6, s: 'telescope' }, { u: '1F52C', e: '🔬', n: 'Microscope', f: 6, s: 'microscope' }, { u: '1F573', e: '🕳', n: 'Hole', f: 6, s: 'hole' }, { u: '1F48A', e: '💊', n: 'Pill', f: 6, s: 'pill' }, { u: '1F489', e: '💉', n: 'Syringe', f: 6, s: 'syringe' }, { u: '1F321', e: '🌡', n: 'Thermometer', f: 6, s: 'thermometer' }, { u: '1F3F7', e: '🏷', n: 'Label', f: 6, s: 'label' }, { u: '1F516', e: '🔖', n: 'Bookmark', f: 6, s: 'bookmark' }, { u: '1F6BD', e: '🚽', n: 'Toilet', f: 6, s: 'toilet' }, { u: '1F6BF', e: '🚿', n: 'Shower', f: 6, s: 'shower' }, { u: '1F6C1', e: '🛁', n: 'Bathtub', f: 6, s: 'bathtub' }, { u: '1F511', e: '🔑', n: 'Key', f: 6, s: 'key' }, { u: '1F5DD', e: '🗝', n: 'Old Key', f: 6, s: 'key2' }, { u: '1F6CB', e: '🛋', n: 'Couch And Lamp', f: 6, s: 'couch' }, { u: '1F6CC', e: '🛌', n: 'Sleeping Accommodation', f: 6, s: 'sleeping_accommodation' }, { u: '1F6CF', e: '🛏', n: 'Bed', f: 6, s: 'bed' }, { u: '1F6AA', e: '🚪', n: 'Door', f: 6, s: 'door' }, { u: '1F6CE', e: '🛎', n: 'Bellhop Bell', f: 6, s: 'bellhop' }, { u: '1F5BC', e: '🖼', n: 'Frame With Picture', f: 6, s: 'frame_photo' }, { u: '1F5FA', e: '🗺', n: 'World Map', f: 6, s: 'map' }, { u: '26F1', e: '⛱', n: 'Umbrella On Ground', f: 6 }, { u: '1F5FF', e: '🗿', n: 'Moyai', f: 6, s: 'moyai' }, { u: '1F6CD', e: '🛍', n: 'Shopping Bags', f: 6, s: 'shopping_bags' }, { u: '1F388', e: '🎈', n: 'Balloon', f: 6, s: 'balloon' }, { u: '1F38F', e: '🎏', n: 'Carp Streamer', f: 6, s: 'flags' }, { u: '1F380', e: '🎀', n: 'Ribbon', f: 6, s: 'ribbon' }, { u: '1F381', e: '🎁', n: 'Wrapped Present', f: 6, s: 'gift' }, { u: '1F38A', e: '🎊', n: 'Confetti Ball', f: 6, s: 'confetti_ball' }, { u: '1F389', e: '🎉', n: 'Party Popper', f: 6, s: 'tada' }, { u: '1F38E', e: '🎎', n: 'Japanese Dolls', f: 6, s: 'dolls' }, { u: '1F390', e: '🎐', n: 'Wind Chime', f: 6, s: 'wind_chime' }, { u: '1F38C', e: '🎌', n: 'Crossed Flags', f: 6, s: 'crossed_flags' }, { u: '1F3EE', e: '🏮', n: 'Izakaya Lantern', f: 6, s: 'izakaya_lantern' }, { u: '2709', e: '✉️', n: 'Envelope', f: 6, s: 'envelope' }, { u: '1F4E9', e: '📩', n: 'Envelope With Downwards Arrow Above', f: 6, s: 'envelope_with_arrow' }, { u: '1F4E8', e: '📨', n: 'Incoming Envelope', f: 6, s: 'incoming_envelope' }, { u: '1F4E7', e: '📧', n: 'E-mail Symbol', f: 6, s: 'e-mail' }, { u: '1F48C', e: '💌', n: 'Love Letter', f: 6, s: 'love_letter' }, { u: '1F4EE', e: '📮', n: 'Postbox', f: 6, s: 'postbox' }, { u: '1F4EA', e: '📪', n: 'Closed Mailbox With Lowered Flag', f: 6, s: 'mailbox_closed' }, { u: '1F4EB', e: '📫', n: 'Closed Mailbox With Raised Flag', f: 6, s: 'mailbox' }, { u: '1F4EC', e: '📬', n: 'Open Mailbox With Raised Flag', f: 6, s: 'mailbox_with_mail' }, { u: '1F4ED', e: '📭', n: 'Open Mailbox With Lowered Flag', f: 6, s: 'mailbox_with_no_mail' }, { u: '1F4E6', e: '📦', n: 'Package', f: 6, s: 'package' }, { u: '1F4EF', e: '📯', n: 'Postal Horn', f: 6, s: 'postal_horn' }, { u: '1F4E5', e: '📥', n: 'Inbox Tray', f: 6, s: 'inbox_tray' }, { u: '1F4E4', e: '📤', n: 'Outbox Tray', f: 6, s: 'outbox_tray' }, { u: '1F4DC', e: '📜', n: 'Scroll', f: 6, s: 'scroll' }, { u: '1F4C3', e: '📃', n: 'Page With Curl', f: 6, s: 'page_with_curl' }, { u: '1F4D1', e: '📑', n: 'Bookmark Tabs', f: 6, s: 'bookmark_tabs' }, { u: '1F4CA', e: '📊', n: 'Bar Chart', f: 6, s: 'bar_chart' }, { u: '1F4C8', e: '📈', n: 'Chart With Upwards Trend', f: 6, s: 'chart_with_upwards_trend' }, { u: '1F4C9', e: '📉', n: 'Chart With Downwards Trend', f: 6, s: 'chart_with_downwards_trend' }, { u: '1F4C4', e: '📄', n: 'Page Facing Up', f: 6, s: 'page_facing_up' }, { u: '1F4C5', e: '📅', n: 'Calendar', f: 6, s: 'date' }, { u: '1F4C6', e: '📆', n: 'Tear-off Calendar', f: 6, s: 'calendar' }, { u: '1F5D3', e: '🗓', n: 'Spiral Calendar Pad', f: 6, s: 'calendar_spiral' }, { u: '1F4C7', e: '📇', n: 'Card Index', f: 6, s: 'card_index' }, { u: '1F5C3', e: '🗃', n: 'Card File Box', f: 6, s: 'card_box' }, { u: '1F5F3', e: '🗳', n: 'Ballot Box With Ballot', f: 6, s: 'ballot_box' }, { u: '1F5C4', e: '🗄', n: 'File Cabinet', f: 6, s: 'file_cabinet' }, { u: '1F4CB', e: '📋', n: 'Clipboard', f: 6, s: 'clipboard' }, { u: '1F5D2', e: '🗒', n: 'Spiral Note Pad', f: 6, s: 'notepad_spiral' }, { u: '1F4C1', e: '📁', n: 'File Folder', f: 6, s: 'file_folder' }, { u: '1F4C2', e: '📂', n: 'Open File Folder', f: 6, s: 'open_file_folder' }, { u: '1F5C2', e: '🗂', n: 'Card Index Dividers', f: 6, s: 'dividers' }, { u: '1F5DE', e: '🗞', n: 'Rolled-up Newspaper', f: 6, s: 'newspaper2' }, { u: '1F4F0', e: '📰', n: 'Newspaper', f: 6, s: 'newspaper' }, { u: '1F4D3', e: '📓', n: 'Notebook', f: 6, s: 'notebook' }, { u: '1F4D5', e: '📕', n: 'Closed Book', f: 6, s: 'closed_book' }, { u: '1F4D7', e: '📗', n: 'Green Book', f: 6, s: 'green_book' }, { u: '1F4D8', e: '📘', n: 'Blue Book', f: 6, s: 'blue_book' }, { u: '1F4D9', e: '📙', n: 'Orange Book', f: 6, s: 'orange_book' }, { u: '1F4D4', e: '📔', n: 'Notebook With Decorative Cover', f: 6, s: 'notebook_with_decorative_cover' }, { u: '1F4D2', e: '📒', n: 'Ledger', f: 6, s: 'ledger' }, { u: '1F4DA', e: '📚', n: 'Books', f: 6, s: 'books' }, { u: '1F4D6', e: '📖', n: 'Open Book', f: 6, s: 'book' }, { u: '1F517', e: '🔗', n: 'Link Symbol', f: 6, s: 'link' }, { u: '1F4CE', e: '📎', n: 'Paperclip', f: 6, s: 'paperclip' }, { u: '1F587', e: '🖇', n: 'Linked Paperclips', f: 6, s: 'paperclips' }, { u: '2702', e: '✂️', n: 'Black Scissors', f: 6, s: 'scissors' }, { u: '1F4D0', e: '📐', n: 'Triangular Ruler', f: 6, s: 'triangular_ruler' }, { u: '1F4CF', e: '📏', n: 'Straight Ruler', f: 6, s: 'straight_ruler' }, { u: '1F4CC', e: '📌', n: 'Pushpin', f: 6, s: 'pushpin' }, { u: '1F4CD', e: '📍', n: 'Round Pushpin', f: 6, s: 'round_pushpin' }, { u: '1F6A9', e: '🚩', n: 'Triangular Flag On Post', f: 6, s: 'triangular_flag_on_post' }, { u: '1F3F3', e: '🏳', n: 'Waving White Flag', f: 6, s: 'flag_white' }, { u: '1F3F4', e: '🏴', n: 'Waving Black Flag', f: 6, s: 'flag_black' }, { u: '1F510', e: '🔐', n: 'Closed Lock With Key', f: 6, s: 'closed_lock_with_key' }, { u: '1F512', e: '🔒', n: 'Lock', f: 6, s: 'lock' }, { u: '1F513', e: '🔓', n: 'Open Lock', f: 6, s: 'unlock' }, { u: '1F50F', e: '🔏', n: 'Lock With Ink Pen', f: 6, s: 'lock_with_ink_pen' }, { u: '1F58A', e: '🖊', n: 'Lower Left Ballpoint Pen', f: 6, s: 'pen_ballpoint' }, { u: '1F58B', e: '🖋', n: 'Lower Left Fountain Pen', f: 6, s: 'pen_fountain' }, { u: '2712', e: '✒️', n: 'Black Nib', f: 6, s: 'black_nib' }, { u: '1F4DD', e: '📝', n: 'Memo', f: 6, s: 'pencil' }, { u: '270F', e: '✏️', n: 'Pencil', f: 6, s: 'pencil2' }, { u: '1F58D', e: '🖍', n: 'Lower Left Crayon', f: 6, s: 'crayon' }, { u: '1F58C', e: '🖌', n: 'Lower Left Paintbrush', f: 6, s: 'paintbrush' }, { u: '1F50D', e: '🔍', n: 'Left-pointing Magnifying Glass', f: 6, s: 'mag' }, { u: '1F50E', e: '🔎', n: 'Right-pointing Magnifying Glass', f: 6, s: 'mag_right' }, { u: '2764', e: '❤️', n: 'Heavy Black Heart', f: 7, s: 'heart' }, { u: '1F49B', e: '💛', n: 'Yellow Heart', f: 7, s: 'yellow_heart' }, { u: '1F49A', e: '💚', n: 'Green Heart', f: 7, s: 'green_heart' }, { u: '1F499', e: '💙', n: 'Blue Heart', f: 7, s: 'blue_heart' }, { u: '1F49C', e: '💜', n: 'Purple Heart', f: 7, s: 'purple_heart' }, { u: '1F494', e: '💔', n: 'Broken Heart', f: 7, s: 'broken_heart' }, { u: '2763', e: '❣️', n: 'Heavy Heart Exclamation Mark Ornament', f: 7 }, { u: '1F495', e: '💕', n: 'Two Hearts', f: 7, s: 'two_hearts' }, { u: '1F49E', e: '💞', n: 'Revolving Hearts', f: 7, s: 'revolving_hearts' }, { u: '1F493', e: '💓', n: 'Beating Heart', f: 7, s: 'heartbeat' }, { u: '1F497', e: '💗', n: 'Growing Heart', f: 7, s: 'heartpulse' }, { u: '1F496', e: '💖', n: 'Sparkling Heart', f: 7, s: 'sparkling_heart' }, { u: '1F498', e: '💘', n: 'Heart With Arrow', f: 7, s: 'cupid' }, { u: '1F49D', e: '💝', n: 'Heart With Ribbon', f: 7, s: 'gift_heart' }, { u: '1F49F', e: '💟', n: 'Heart Decoration', f: 7, s: 'heart_decoration' }, { u: '262E', e: '☮', n: 'Peace Symbol', f: 7 }, { u: '271D', e: '✝️', n: 'Latin Cross', f: 7 }, { u: '262A', e: '☪', n: 'Star And Crescent', f: 7 }, { u: '1F549', e: '🕉', n: 'Om Symbol', f: 7, s: 'om_symbol' }, { u: '2638', e: '☸', n: 'Wheel Of Dharma', f: 7 }, { u: '2721', e: '✡️', n: 'Star Of David', f: 7 }, { u: '1F52F', e: '🔯', n: 'Six Pointed Star With Middle Dot', f: 7, s: 'six_pointed_star' }, { u: '1F54E', e: '🕎', n: 'Menorah With Nine Branches', f: 7 }, { u: '262F', e: '☯️', n: 'Yin Yang', f: 7 }, { u: '2626', e: '☦', n: 'Orthodox Cross', f: 7 }, { u: '1F6D0', e: '🛐', n: 'Place Of Worship', f: 7 }, { u: '26CE', e: '⛎', n: 'Ophiuchus', f: 7, s: 'ophiuchus' }, { u: '2648', e: '♈️', n: 'Aries', f: 7, s: 'aries' }, { u: '2649', e: '♉️', n: 'Taurus', f: 7, s: 'taurus' }, { u: '264A', e: '♊️', n: 'Gemini', f: 7, s: 'gemini' }, { u: '264B', e: '♋️', n: 'Cancer', f: 7, s: 'cancer' }, { u: '264C', e: '♌️', n: 'Leo', f: 7, s: 'leo' }, { u: '264D', e: '♍️', n: 'Virgo', f: 7, s: 'virgo' }, { u: '264E', e: '♎️', n: 'Libra', f: 7, s: 'libra' }, { u: '264F', e: '♏️', n: 'Scorpius', f: 7, s: 'scorpius' }, { u: '2650', e: '♐️', n: 'Sagittarius', f: 7, s: 'sagittarius' }, { u: '2651', e: '♑️', n: 'Capricorn', f: 7, s: 'capricorn' }, { u: '2652', e: '♒️', n: 'Aquarius', f: 7, s: 'aquarius' }, { u: '2653', e: '♓️', n: 'Pisces', f: 7, s: 'pisces' }, { u: '1F194', e: '🆔', n: 'Squared Id', f: 7, s: 'id' }, { u: '269B', e: '⚛', n: 'Atom Symbol', f: 7 }, { u: '1F233', e: '🈳', n: 'Squared Cjk Unified Ideograph-7a7a', f: 7, s: 'u7a7a' }, { u: '1F239', e: '🈹', n: 'Squared Cjk Unified Ideograph-5272', f: 7, s: 'u5272' }, { u: '2622', e: '☢', n: 'Radioactive Sign', f: 7 }, { u: '2623', e: '☣', n: 'Biohazard Sign', f: 7 }, { u: '1F4F4', e: '📴', n: 'Mobile Phone Off', f: 7, s: 'mobile_phone_off' }, { u: '1F4F3', e: '📳', n: 'Vibration Mode', f: 7, s: 'vibration_mode' }, { u: '1F236', e: '🈶', n: 'Squared Cjk Unified Ideograph-6709', f: 7, s: 'u6709' }, { u: '1F21A', e: '🈚️', n: 'Squared Cjk Unified Ideograph-7121', f: 7, s: 'u7121' }, { u: '1F238', e: '🈸', n: 'Squared Cjk Unified Ideograph-7533', f: 7, s: 'u7533' }, { u: '1F23A', e: '🈺', n: 'Squared Cjk Unified Ideograph-55b6', f: 7, s: 'u55b6' }, { u: '1F237', e: '🈷️', n: 'Squared Cjk Unified Ideograph-6708', f: 7, s: 'u6708' }, { u: '2734', e: '✴️', n: 'Eight Pointed Black Star', f: 7, s: 'eight_pointed_black_star' }, { u: '1F19A', e: '🆚', n: 'Squared Vs', f: 7, s: 'vs' }, { u: '1F251', e: '🉑', n: 'Circled Ideograph Accept', f: 7, s: 'accept' }, { u: '1F4AE', e: '💮', n: 'White Flower', f: 7, s: 'white_flower' }, { u: '1F250', e: '🉐', n: 'Circled Ideograph Advantage', f: 7, s: 'ideograph_advantage' }, { u: '3299', e: '㊙️', n: 'Circled Ideograph Secret', f: 7, s: 'secret' }, { u: '3297', e: '㊗️', n: 'Circled Ideograph Congratulation', f: 7, s: 'congratulations' }, { u: '1F234', e: '🈴', n: 'Squared Cjk Unified Ideograph-5408', f: 7, s: 'u5408' }, { u: '1F235', e: '🈵', n: 'Squared Cjk Unified Ideograph-6e80', f: 7, s: 'u6e80' }, { u: '1F232', e: '🈲', n: 'Squared Cjk Unified Ideograph-7981', f: 7, s: 'u7981' }, { u: '1F170', e: '🅰️', n: 'Negative Squared Latin Capital Letter A', f: 7, s: 'a' }, { u: '1F171', e: '🅱️', n: 'Negative Squared Latin Capital Letter B', f: 7, s: 'b' }, { u: '1F18E', e: '🆎', n: 'Negative Squared Ab', f: 7, s: 'ab' }, { u: '1F191', e: '🆑', n: 'Squared Cl', f: 7, s: 'cl' }, { u: '1F17E', e: '🅾️', n: 'Negative Squared Latin Capital Letter O', f: 7, s: 'o2' }, { u: '1F198', e: '🆘', n: 'Squared Sos', f: 7, s: 'sos' }, { u: '26D4', e: '⛔️', n: 'No Entry', f: 7, s: 'no_entry' }, { u: '1F4DB', e: '📛', n: 'Name Badge', f: 7, s: 'name_badge' }, { u: '1F6AB', e: '🚫', n: 'No Entry Sign', f: 7, s: 'no_entry_sign' }, { u: '274C', e: '❌', n: 'Cross Mark', f: 7, s: 'x' }, { u: '2B55', e: '⭕️', n: 'Heavy Large Circle', f: 7, s: 'o' }, { u: '1F4A2', e: '💢', n: 'Anger Symbol', f: 7, s: 'anger' }, { u: '2668', e: '♨️', n: 'Hot Springs', f: 7, s: 'hotsprings' }, { u: '1F6B7', e: '🚷', n: 'No Pedestrians', f: 7, s: 'no_pedestrians' }, { u: '1F6AF', e: '🚯', n: 'Do Not Litter Symbol', f: 7, s: 'do_not_litter' }, { u: '1F6B3', e: '🚳', n: 'No Bicycles', f: 7, s: 'no_bicycles' }, { u: '1F6B1', e: '🚱', n: 'Non-potable Water Symbol', f: 7, s: 'non-potable_water' }, { u: '1F51E', e: '🔞', n: 'No One Under Eighteen Symbol', f: 7, s: 'underage' }, { u: '1F4F5', e: '📵', n: 'No Mobile Phones', f: 7, s: 'no_mobile_phones' }, { u: '2757', e: '❗️', n: 'Heavy Exclamation Mark Symbol', f: 7, s: 'exclamation' }, { u: '2755', e: '❕', n: 'White Exclamation Mark Ornament', f: 7, s: 'grey_exclamation' }, { u: '2753', e: '❓', n: 'Black Question Mark Ornament', f: 7, s: 'question' }, { u: '2754', e: '❔', n: 'White Question Mark Ornament', f: 7, s: 'grey_question' }, { u: '203C', e: '‼️', n: 'Double Exclamation Mark', f: 7, s: 'bangbang' }, { u: '2049', e: '⁉️', n: 'Exclamation Question Mark', f: 7, s: 'interrobang' }, { u: '1F4AF', e: '💯', n: 'Hundred Points Symbol', f: 7, s: '100' }, { u: '1F505', e: '🔅', n: 'Low Brightness Symbol', f: 7, s: 'low_brightness' }, { u: '1F506', e: '🔆', n: 'High Brightness Symbol', f: 7, s: 'high_brightness' }, { u: '1F531', e: '🔱', n: 'Trident Emblem', f: 7, s: 'trident' }, { u: '269C', e: '⚜', n: 'Fleur-de-lis', f: 7 }, { u: '303D', e: '〽️', n: 'Part Alternation Mark', f: 7, s: 'part_alternation_mark' }, { u: '26A0', e: '⚠️', n: 'Warning Sign', f: 7, s: 'warning' }, { u: '1F6B8', e: '🚸', n: 'Children Crossing', f: 7, s: 'children_crossing' }, { u: '1F530', e: '🔰', n: 'Japanese Symbol For Beginner', f: 7, s: 'beginner' }, { u: '267B', e: '♻️', n: 'Black Universal Recycling Symbol', f: 7, s: 'recycle' }, { u: '1F22F', e: '🈯️', n: 'Squared Cjk Unified Ideograph-6307', f: 7, s: 'u6307' }, { u: '1F4B9', e: '💹', n: 'Chart With Upwards Trend And Yen Sign', f: 7, s: 'chart' }, { u: '2747', e: '❇️', n: 'Sparkle', f: 7, s: 'sparkle' }, { u: '2733', e: '✳️', n: 'Eight Spoked Asterisk', f: 7, s: 'eight_spoked_asterisk' }, { u: '274E', e: '❎', n: 'Negative Squared Cross Mark', f: 7, s: 'negative_squared_cross_mark' }, { u: '2705', e: '✅', n: 'White Heavy Check Mark', f: 7, s: 'white_check_mark' }, { u: '1F4A0', e: '💠', n: 'Diamond Shape With A Dot Inside', f: 7, s: 'diamond_shape_with_a_dot_inside' }, { u: '1F300', e: '🌀', n: 'Cyclone', f: 7, s: 'cyclone' }, { u: '27BF', e: '➿', n: 'Double Curly Loop', f: 7, s: 'loop' }, { u: '1F310', e: '🌐', n: 'Globe With Meridians', f: 7, s: 'globe_with_meridians' }, { u: '24C2', e: 'Ⓜ️', n: 'Circled Latin Capital Letter M', f: 7, s: 'm' }, { u: '1F3E7', e: '🏧', n: 'Automated Teller Machine', f: 7, s: 'atm' }, { u: '1F202', e: '🈂️', n: 'Squared Katakana Sa', f: 7, s: 'sa' }, { u: '1F6C2', e: '🛂', n: 'Passport Control', f: 7, s: 'passport_control' }, { u: '1F6C3', e: '🛃', n: 'Customs', f: 7, s: 'customs' }, { u: '1F6C4', e: '🛄', n: 'Baggage Claim', f: 7, s: 'baggage_claim' }, { u: '1F6C5', e: '🛅', n: 'Left Luggage', f: 7, s: 'left_luggage' }, { u: '267F', e: '♿️', n: 'Wheelchair Symbol', f: 7, s: 'wheelchair' }, { u: '1F6AD', e: '🚭', n: 'No Smoking Symbol', f: 7, s: 'no_smoking' }, { u: '1F6BE', e: '🚾', n: 'Water Closet', f: 7, s: 'wc' }, { u: '1F17F', e: '🅿️', n: 'Negative Squared Latin Capital Letter P', f: 7, s: 'parking' }, { u: '1F6B0', e: '🚰', n: 'Potable Water Symbol', f: 7, s: 'potable_water' }, { u: '1F6B9', e: '🚹', n: 'Mens Symbol', f: 7, s: 'mens' }, { u: '1F6BA', e: '🚺', n: 'Womens Symbol', f: 7, s: 'womens' }, { u: '1F6BC', e: '🚼', n: 'Baby Symbol', f: 7, s: 'baby_symbol' }, { u: '1F6BB', e: '🚻', n: 'Restroom', f: 7, s: 'restroom' }, { u: '1F6AE', e: '🚮', n: 'Put Litter In Its Place Symbol', f: 7, s: 'put_litter_in_its_place' }, { u: '1F3A6', e: '🎦', n: 'Cinema', f: 7, s: 'cinema' }, { u: '1F4F6', e: '📶', n: 'Antenna With Bars', f: 7, s: 'signal_strength' }, { u: '1F201', e: '🈁', n: 'Squared Katakana Koko', f: 7, s: 'koko' }, { u: '1F196', e: '🆖', n: 'Squared Ng', f: 7, s: 'ng' }, { u: '1F197', e: '🆗', n: 'Squared Ok', f: 7, s: 'ok' }, { u: '1F199', e: '🆙', n: 'Squared Up With Exclamation Mark', f: 7, s: 'up' }, { u: '1F192', e: '🆒', n: 'Squared Cool', f: 7, s: 'cool' }, { u: '1F195', e: '🆕', n: 'Squared New', f: 7, s: 'new' }, { u: '1F193', e: '🆓', n: 'Squared Free', f: 7, s: 'free' }, { u: '0030-20E3', e: '0️⃣', n: 'Keycap Digit Zero', f: 7, s: 'zero' }, { u: '0031-20E3', e: '1️⃣', n: 'Keycap Digit One', f: 7, s: 'one' }, { u: '0032-20E3', e: '2️⃣', n: 'Keycap Digit Two', f: 7, s: 'two' }, { u: '0033-20E3', e: '3️⃣', n: 'Keycap Digit Three', f: 7, s: 'three' }, { u: '0034-20E3', e: '4️⃣', n: 'Keycap Digit Four', f: 7, s: 'four' }, { u: '0035-20E3', e: '5️⃣', n: 'Keycap Digit Five', f: 7, s: 'five' }, { u: '0036-20E3', e: '6️⃣', n: 'Keycap Digit Six', f: 7, s: 'six' }, { u: '0037-20E3', e: '7️⃣', n: 'Keycap Digit Seven', f: 7, s: 'seven' }, { u: '0038-20E3', e: '8️⃣', n: 'Keycap Digit Eight', f: 7, s: 'eight' }, { u: '0039-20E3', e: '9️⃣', n: 'Keycap Digit Nine', f: 7, s: 'nine' }, { u: '1F51F', e: '🔟', n: 'Keycap Ten', f: 7, s: 'keycap_ten' }, { u: '1F522', e: '🔢', n: 'Input Symbol For Numbers', f: 7, s: '1234' }, { u: '25B6', e: '▶️', n: 'Black Right-pointing Triangle', f: 7, s: 'arrow_forward' }, { u: '23F8', e: '⏸', n: 'Double Vertical Bar', f: 7 }, { u: '23EF', e: '⏯', n: 'Black Right-pointing Triangle With Double Vertical Bar', f: 7 }, { u: '23F9', e: '⏹', n: 'Black Square For Stop', f: 7 }, { u: '23FA', e: '⏺', n: 'Black Circle For Record', f: 7 }, { u: '23ED', e: '⏭', n: 'Black Right-pointing Double Triangle With Vertical Bar', f: 7 }, { u: '23EE', e: '⏮', n: 'Black Left-pointing Double Triangle With Vertical Bar', f: 7 }, { u: '23E9', e: '⏩', n: 'Black Right-pointing Double Triangle', f: 7, s: 'fast_forward' }, { u: '23EA', e: '⏪', n: 'Black Left-pointing Double Triangle', f: 7, s: 'rewind' }, { u: '1F500', e: '🔀', n: 'Twisted Rightwards Arrows', f: 7, s: 'twisted_rightwards_arrows' }, { u: '1F501', e: '🔁', n: 'Clockwise Rightwards And Leftwards Open Circle Arrows', f: 7, s: 'repeat' }, { u: '1F502', e: '🔂', n: 'Clockwise Rightwards And Leftwards Open Circle Arrows With Circled One Overlay', f: 7, s: 'repeat_one' }, { u: '25C0', e: '◀️', n: 'Black Left-pointing Triangle', f: 7, s: 'arrow_backward' }, { u: '1F53C', e: '🔼', n: 'Up-pointing Small Red Triangle', f: 7, s: 'arrow_up_small' }, { u: '1F53D', e: '🔽', n: 'Down-pointing Small Red Triangle', f: 7, s: 'arrow_down_small' }, { u: '23EB', e: '⏫', n: 'Black Up-pointing Double Triangle', f: 7, s: 'arrow_double_up' }, { u: '23EC', e: '⏬', n: 'Black Down-pointing Double Triangle', f: 7, s: 'arrow_double_down' }, { u: '27A1', e: '➡️', n: 'Black Rightwards Arrow', f: 7, s: 'arrow_right' }, { u: '2B05', e: '⬅️', n: 'Leftwards Black Arrow', f: 7, s: 'arrow_left' }, { u: '2B06', e: '⬆️', n: 'Upwards Black Arrow', f: 7, s: 'arrow_up' }, { u: '2B07', e: '⬇️', n: 'Downwards Black Arrow', f: 7, s: 'arrow_down' }, { u: '2197', e: '↗️', n: 'North East Arrow', f: 7, s: 'arrow_upper_right' }, { u: '2198', e: '↘️', n: 'South East Arrow', f: 7, s: 'arrow_lower_right' }, { u: '2199', e: '↙️', n: 'South West Arrow', f: 7, s: 'arrow_lower_left' }, { u: '2196', e: '↖️', n: 'North West Arrow', f: 7, s: 'arrow_upper_left' }, { u: '2195', e: '↕️', n: 'Up Down Arrow', f: 7, s: 'arrow_up_down' }, { u: '2194', e: '↔️', n: 'Left Right Arrow', f: 7, s: 'left_right_arrow' }, { u: '1F504', e: '🔄', n: 'Anticlockwise Downwards And Upwards Open Circle Arrows', f: 7, s: 'arrows_counterclockwise' }, { u: '21AA', e: '↪️', n: 'Rightwards Arrow With Hook', f: 7, s: 'arrow_right_hook' }, { u: '21A9', e: '↩️', n: 'Leftwards Arrow With Hook', f: 7, s: 'leftwards_arrow_with_hook' }, { u: '2934', e: '⤴️', n: 'Arrow Pointing Rightwards Then Curving Upwards', f: 7, s: 'arrow_heading_up' }, { u: '2935', e: '⤵️', n: 'Arrow Pointing Rightwards Then Curving Downwards', f: 7, s: 'arrow_heading_down' }, { u: '0023-20E3', e: '#️⃣', n: 'Keycap Number Sign', f: 7, s: 'hash' }, { u: '002A-20E3', e: '*️⃣', n: 'Keycap Asterisk', f: 7 }, { u: '2139', e: 'ℹ️', n: 'Information Source', f: 7, s: 'information_source' }, { u: '1F524', e: '🔤', n: 'Input Symbol For Latin Letters', f: 7, s: 'abc' }, { u: '1F521', e: '🔡', n: 'Input Symbol For Latin Small Letters', f: 7, s: 'abcd' }, { u: '1F520', e: '🔠', n: 'Input Symbol For Latin Capital Letters', f: 7, s: 'capital_abcd' }, { u: '1F523', e: '🔣', n: 'Input Symbol For Symbols', f: 7, s: 'symbols' }, { u: '1F3B5', e: '🎵', n: 'Musical Note', f: 7, s: 'musical_note' }, { u: '1F3B6', e: '🎶', n: 'Multiple Musical Notes', f: 7, s: 'notes' }, { u: '3030', e: '〰️', n: 'Wavy Dash', f: 7, s: 'wavy_dash' }, { u: '27B0', e: '➰', n: 'Curly Loop', f: 7, s: 'curly_loop' }, { u: '2714', e: '✔️', n: 'Heavy Check Mark', f: 7, s: 'heavy_check_mark' }, { u: '1F503', e: '🔃', n: 'Clockwise Downwards And Upwards Open Circle Arrows', f: 7, s: 'arrows_clockwise' }, { u: '2795', e: '➕', n: 'Heavy Plus Sign', f: 7, s: 'heavy_plus_sign' }, { u: '2796', e: '➖', n: 'Heavy Minus Sign', f: 7, s: 'heavy_minus_sign' }, { u: '2797', e: '➗', n: 'Heavy Division Sign', f: 7, s: 'heavy_division_sign' }, { u: '2716', e: '✖️', n: 'Heavy Multiplication X', f: 7, s: 'heavy_multiplication_x' }, { u: '1F4B2', e: '💲', n: 'Heavy Dollar Sign', f: 7, s: 'heavy_dollar_sign' }, { u: '1F4B1', e: '💱', n: 'Currency Exchange', f: 7, s: 'currency_exchange' }, { u: '00A9', e: '©️', n: 'Copyright Sign', f: 7, s: 'copyright' }, { u: '00AE', e: '®️', n: 'Registered Sign', f: 7, s: 'registered' }, { u: '2122', e: '™️', n: 'Trade Mark Sign', f: 7, s: 'tm' }, { u: '1F51A', e: '🔚', n: 'End With Leftwards Arrow Above', f: 7, s: 'end' }, { u: '1F519', e: '🔙', n: 'Back With Leftwards Arrow Above', f: 7, s: 'back' }, { u: '1F51B', e: '🔛', n: 'On With Exclamation Mark With Left Right Arrow Above', f: 7, s: 'on' }, { u: '1F51D', e: '🔝', n: 'Top With Upwards Arrow Above', f: 7, s: 'top' }, { u: '1F51C', e: '🔜', n: 'Soon With Rightwards Arrow Above', f: 7, s: 'soon' }, { u: '2611', e: '☑️', n: 'Ballot Box With Check', f: 7, s: 'ballot_box_with_check' }, { u: '1F518', e: '🔘', n: 'Radio Button', f: 7, s: 'radio_button' }, { u: '26AA', e: '⚪️', n: 'Medium White Circle', f: 7, s: 'white_circle' }, { u: '26AB', e: '⚫️', n: 'Medium Black Circle', f: 7, s: 'black_circle' }, { u: '1F534', e: '🔴', n: 'Large Red Circle', f: 7, s: 'red_circle' }, { u: '1F535', e: '🔵', n: 'Large Blue Circle', f: 7, s: 'large_blue_circle' }, { u: '1F538', e: '🔸', n: 'Small Orange Diamond', f: 7, s: 'small_orange_diamond' }, { u: '1F539', e: '🔹', n: 'Small Blue Diamond', f: 7, s: 'small_blue_diamond' }, { u: '1F536', e: '🔶', n: 'Large Orange Diamond', f: 7, s: 'large_orange_diamond' }, { u: '1F537', e: '🔷', n: 'Large Blue Diamond', f: 7, s: 'large_blue_diamond' }, { u: '1F53A', e: '🔺', n: 'Up-pointing Red Triangle', f: 7, s: 'small_red_triangle' }, { u: '25AA', e: '▪️', n: 'Black Small Square', f: 7, s: 'black_small_square' }, { u: '25AB', e: '▫️', n: 'White Small Square', f: 7, s: 'white_small_square' }, { u: '2B1B', e: '⬛️', n: 'Black Large Square', f: 7, s: 'black_large_square' }, { u: '2B1C', e: '⬜️', n: 'White Large Square', f: 7, s: 'white_large_square' }, { u: '1F53B', e: '🔻', n: 'Down-pointing Red Triangle', f: 7, s: 'small_red_triangle_down' }, { u: '25FC', e: '◼️', n: 'Black Medium Square', f: 7, s: 'black_medium_square' }, { u: '25FB', e: '◻️', n: 'White Medium Square', f: 7, s: 'white_medium_square' }, { u: '25FE', e: '◾️', n: 'Black Medium Small Square', f: 7, s: 'black_medium_small_square' }, { u: '25FD', e: '◽️', n: 'White Medium Small Square', f: 7, s: 'white_medium_small_square' }, { u: '1F532', e: '🔲', n: 'Black Square Button', f: 7, s: 'black_square_button' }, { u: '1F533', e: '🔳', n: 'White Square Button', f: 7, s: 'white_square_button' }, { u: '1F508', e: '🔈', n: 'Speaker', f: 7, s: 'speaker' }, { u: '1F509', e: '🔉', n: 'Speaker With One Sound Wave', f: 7, s: 'sound' }, { u: '1F50A', e: '🔊', n: 'Speaker With Three Sound Waves', f: 7, s: 'loud_sound' }, { u: '1F507', e: '🔇', n: 'Speaker With Cancellation Stroke', f: 7, s: 'mute' }, { u: '1F4E3', e: '📣', n: 'Cheering Megaphone', f: 7, s: 'mega' }, { u: '1F4E2', e: '📢', n: 'Public Address Loudspeaker', f: 7, s: 'loudspeaker' }, { u: '1F514', e: '🔔', n: 'Bell', f: 7, s: 'bell' }, { u: '1F515', e: '🔕', n: 'Bell With Cancellation Stroke', f: 7, s: 'no_bell' }, { u: '1F0CF', e: '🃏', n: 'Playing Card Black Joker', f: 7, s: 'black_joker' }, { u: '1F004', e: '🀄️', n: 'Mahjong Tile Red Dragon', f: 7, s: 'mahjong' }, { u: '2660', e: '♠️', n: 'Black Spade Suit', f: 7, s: 'spades' }, { u: '2663', e: '♣️', n: 'Black Club Suit', f: 7, s: 'clubs' }, { u: '2665', e: '♥️', n: 'Black Heart Suit', f: 7, s: 'hearts' }, { u: '2666', e: '♦️', n: 'Black Diamond Suit', f: 7, s: 'diamonds' }, { u: '1F3B4', e: '🎴', n: 'Flower Playing Cards', f: 7, s: 'flower_playing_cards' }, { u: '1F4AD', e: '💭', n: 'Thought Balloon', f: 7, s: 'thought_balloon' }, { u: '1F5EF', e: '🗯', n: 'Right Anger Bubble', f: 7, s: 'anger_right' }, { u: '1F4AC', e: '💬', n: 'Speech Balloon', f: 7, s: 'speech_balloon' }, { u: '1F550', e: '🕐', n: 'Clock Face One Oclock', f: 7, s: 'clock1' }, { u: '1F551', e: '🕑', n: 'Clock Face Two Oclock', f: 7, s: 'clock2' }, { u: '1F552', e: '🕒', n: 'Clock Face Three Oclock', f: 7, s: 'clock3' }, { u: '1F553', e: '🕓', n: 'Clock Face Four Oclock', f: 7, s: 'clock4' }, { u: '1F554', e: '🕔', n: 'Clock Face Five Oclock', f: 7, s: 'clock5' }, { u: '1F555', e: '🕕', n: 'Clock Face Six Oclock', f: 7, s: 'clock6' }, { u: '1F556', e: '🕖', n: 'Clock Face Seven Oclock', f: 7, s: 'clock7' }, { u: '1F557', e: '🕗', n: 'Clock Face Eight Oclock', f: 7, s: 'clock8' }, { u: '1F558', e: '🕘', n: 'Clock Face Nine Oclock', f: 7, s: 'clock9' }, { u: '1F559', e: '🕙', n: 'Clock Face Ten Oclock', f: 7, s: 'clock10' }, { u: '1F55A', e: '🕚', n: 'Clock Face Eleven Oclock', f: 7, s: 'clock11' }, { u: '1F55B', e: '🕛', n: 'Clock Face Twelve Oclock', f: 7, s: 'clock12' }, { u: '1F55C', e: '🕜', n: 'Clock Face One-thirty', f: 7, s: 'clock130' }, { u: '1F55D', e: '🕝', n: 'Clock Face Two-thirty', f: 7, s: 'clock230' }, { u: '1F55E', e: '🕞', n: 'Clock Face Three-thirty', f: 7, s: 'clock330' }, { u: '1F55F', e: '🕟', n: 'Clock Face Four-thirty', f: 7, s: 'clock430' }, { u: '1F560', e: '🕠', n: 'Clock Face Five-thirty', f: 7, s: 'clock530' }, { u: '1F561', e: '🕡', n: 'Clock Face Six-thirty', f: 7, s: 'clock630' }, { u: '1F562', e: '🕢', n: 'Clock Face Seven-thirty', f: 7, s: 'clock730' }, { u: '1F563', e: '🕣', n: 'Clock Face Eight-thirty', f: 7, s: 'clock830' }, { u: '1F564', e: '🕤', n: 'Clock Face Nine-thirty', f: 7, s: 'clock930' }, { u: '1F565', e: '🕥', n: 'Clock Face Ten-thirty', f: 7, s: 'clock1030' }, { u: '1F566', e: '🕦', n: 'Clock Face Eleven-thirty', f: 7, s: 'clock1130' }, { u: '1F567', e: '🕧', n: 'Clock Face Twelve-thirty', f: 7, s: 'clock1230' }, { u: '1F5E8', e: '🗨', n: 'Left Speech Bubble', f: 7, s: 'speech_left' }, { u: '1F441-1F5E8', e: '👁‍🗨', n: 'Eye in Speech Bubble', f: 7 }, { u: '23CF', e: '⏏', n: 'Eject Symbol', f: 7 }, { u: '1F1E6-1F1EB', e: '🇦🇫', n: 'Flag For Afghanistan', f: 8, s: 'flag_af' }, { u: '1F1E6-1F1FD', e: '🇦🇽', n: 'Flag For ÅLand Islands', f: 8, s: 'flag_ax' }, { u: '1F1E6-1F1F1', e: '🇦🇱', n: 'Flag For Albania', f: 8, s: 'flag_al' }, { u: '1F1E9-1F1FF', e: '🇩🇿', n: 'Flag For Algeria', f: 8, s: 'flag_dz' }, { u: '1F1E6-1F1F8', e: '🇦🇸', n: 'Flag For American Samoa', f: 8, s: 'flag_as' }, { u: '1F1E6-1F1E9', e: '🇦🇩', n: 'Flag For Andorra', f: 8, s: 'flag_ad' }, { u: '1F1E6-1F1F4', e: '🇦🇴', n: 'Flag For Angola', f: 8, s: 'flag_ao' }, { u: '1F1E6-1F1EE', e: '🇦🇮', n: 'Flag For Anguilla', f: 8, s: 'flag_ai' }, { u: '1F1E6-1F1F6', e: '🇦🇶', n: 'Flag For Antarctica', f: 8, s: 'flag_aq' }, { u: '1F1E6-1F1EC', e: '🇦🇬', n: 'Flag For Antigua & Barbuda', f: 8, s: 'flag_ag' }, { u: '1F1E6-1F1F7', e: '🇦🇷', n: 'Flag For Argentina', f: 8, s: 'flag_ar' }, { u: '1F1E6-1F1F2', e: '🇦🇲', n: 'Flag For Armenia', f: 8, s: 'flag_am' }, { u: '1F1E6-1F1FC', e: '🇦🇼', n: 'Flag For Aruba', f: 8, s: 'flag_aw' }, { u: '1F1E6-1F1FA', e: '🇦🇺', n: 'Flag For Australia', f: 8, s: 'flag_au' }, { u: '1F1E6-1F1F9', e: '🇦🇹', n: 'Flag For Austria', f: 8, s: 'flag_at' }, { u: '1F1E6-1F1FF', e: '🇦🇿', n: 'Flag For Azerbaijan', f: 8, s: 'flag_az' }, { u: '1F1E7-1F1F8', e: '🇧🇸', n: 'Flag For Bahamas', f: 8, s: 'flag_bs' }, { u: '1F1E7-1F1ED', e: '🇧🇭', n: 'Flag For Bahrain', f: 8, s: 'flag_bh' }, { u: '1F1E7-1F1E9', e: '🇧🇩', n: 'Flag For Bangladesh', f: 8, s: 'flag_bd' }, { u: '1F1E7-1F1E7', e: '🇧🇧', n: 'Flag For Barbados', f: 8, s: 'flag_bb' }, { u: '1F1E7-1F1FE', e: '🇧🇾', n: 'Flag For Belarus', f: 8, s: 'flag_by' }, { u: '1F1E7-1F1EA', e: '🇧🇪', n: 'Flag For Belgium', f: 8, s: 'flag_be' }, { u: '1F1E7-1F1FF', e: '🇧🇿', n: 'Flag For Belize', f: 8, s: 'flag_bz' }, { u: '1F1E7-1F1EF', e: '🇧🇯', n: 'Flag For Benin', f: 8, s: 'flag_bj' }, { u: '1F1E7-1F1F2', e: '🇧🇲', n: 'Flag For Bermuda', f: 8, s: 'flag_bm' }, { u: '1F1E7-1F1F9', e: '🇧🇹', n: 'Flag For Bhutan', f: 8, s: 'flag_bt' }, { u: '1F1E7-1F1F4', e: '🇧🇴', n: 'Flag For Bolivia', f: 8, s: 'flag_bo' }, { u: '1F1E7-1F1F6', e: '🇧🇶', n: 'Flag For Caribbean Netherlands', f: 8, s: 'flag_bq' }, { u: '1F1E7-1F1E6', e: '🇧🇦', n: 'Flag For Bosnia & Herzegovina', f: 8, s: 'flag_ba' }, { u: '1F1E7-1F1FC', e: '🇧🇼', n: 'Flag For Botswana', f: 8, s: 'flag_bw' }, { u: '1F1E7-1F1F7', e: '🇧🇷', n: 'Flag For Brazil', f: 8, s: 'flag_br' }, { u: '1F1EE-1F1F4', e: '🇮🇴', n: 'Flag For British Indian Ocean Territory', f: 8, s: 'flag_io' }, { u: '1F1FB-1F1EC', e: '🇻🇬', n: 'Flag For British Virgin Islands', f: 8, s: 'flag_vg' }, { u: '1F1E7-1F1F3', e: '🇧🇳', n: 'Flag For Brunei', f: 8, s: 'flag_bn' }, { u: '1F1E7-1F1EC', e: '🇧🇬', n: 'Flag For Bulgaria', f: 8, s: 'flag_bg' }, { u: '1F1E7-1F1EB', e: '🇧🇫', n: 'Flag For Burkina Faso', f: 8, s: 'flag_bf' }, { u: '1F1E7-1F1EE', e: '🇧🇮', n: 'Flag For Burundi', f: 8, s: 'flag_bi' }, { u: '1F1E8-1F1FB', e: '🇨🇻', n: 'Flag For Cape Verde', f: 8, s: 'flag_cv' }, { u: '1F1F0-1F1ED', e: '🇰🇭', n: 'Flag For Cambodia', f: 8, s: 'flag_kh' }, { u: '1F1E8-1F1F2', e: '🇨🇲', n: 'Flag For Cameroon', f: 8, s: 'flag_cm' }, { u: '1F1E8-1F1E6', e: '🇨🇦', n: 'Flag For Canada', f: 8, s: 'flag_ca' }, { u: '1F1EE-1F1E8', e: '🇮🇨', n: 'Flag For Canary Islands', f: 8, s: 'flag_ic' }, { u: '1F1F0-1F1FE', e: '🇰🇾', n: 'Flag For Cayman Islands', f: 8, s: 'flag_ky' }, { u: '1F1E8-1F1EB', e: '🇨🇫', n: 'Flag For Central African Republic', f: 8, s: 'flag_cf' }, { u: '1F1F9-1F1E9', e: '🇹🇩', n: 'Flag For Chad', f: 8, s: 'flag_td' }, { u: '1F1E8-1F1F1', e: '🇨🇱', n: 'Flag For Chile', f: 8, s: 'flag_cl' }, { u: '1F1E8-1F1F3', e: '🇨🇳', n: 'Flag For China', f: 8, s: 'flag_cn' }, { u: '1F1E8-1F1FD', e: '🇨🇽', n: 'Flag For Christmas Island', f: 8, s: 'flag_cx' }, { u: '1F1E8-1F1E8', e: '🇨🇨', n: 'Flag For Cocos Islands', f: 8, s: 'flag_cc' }, { u: '1F1E8-1F1F4', e: '🇨🇴', n: 'Flag For Colombia', f: 8, s: 'flag_co' }, { u: '1F1F0-1F1F2', e: '🇰🇲', n: 'Flag For Comoros', f: 8, s: 'flag_km' }, { u: '1F1E8-1F1EC', e: '🇨🇬', n: 'Flag For Congo - Brazzaville', f: 8, s: 'flag_cg' }, { u: '1F1E8-1F1E9', e: '🇨🇩', n: 'Flag For Congo - Kinshasa', f: 8, s: 'flag_cd' }, { u: '1F1E8-1F1F0', e: '🇨🇰', n: 'Flag For Cook Islands', f: 8, s: 'flag_ck' }, { u: '1F1E8-1F1F7', e: '🇨🇷', n: 'Flag For Costa Rica', f: 8, s: 'flag_cr' }, { u: '1F1ED-1F1F7', e: '🇭🇷', n: 'Flag For Croatia', f: 8, s: 'flag_hr' }, { u: '1F1E8-1F1FA', e: '🇨🇺', n: 'Flag For Cuba', f: 8, s: 'flag_cu' }, { u: '1F1E8-1F1FC', e: '🇨🇼', n: 'Flag For Curaçao', f: 8, s: 'flag_cw' }, { u: '1F1E8-1F1FE', e: '🇨🇾', n: 'Flag For Cyprus', f: 8, s: 'flag_cy' }, { u: '1F1E8-1F1FF', e: '🇨🇿', n: 'Flag For Czech Republic', f: 8, s: 'flag_cz' }, { u: '1F1E9-1F1F0', e: '🇩🇰', n: 'Flag For Denmark', f: 8, s: 'flag_dk' }, { u: '1F1E9-1F1EF', e: '🇩🇯', n: 'Flag For Djibouti', f: 8, s: 'flag_dj' }, { u: '1F1E9-1F1F2', e: '🇩🇲', n: 'Flag For Dominica', f: 8, s: 'flag_dm' }, { u: '1F1E9-1F1F4', e: '🇩🇴', n: 'Flag For Dominican Republic', f: 8, s: 'flag_do' }, { u: '1F1EA-1F1E8', e: '🇪🇨', n: 'Flag For Ecuador', f: 8, s: 'flag_ec' }, { u: '1F1EA-1F1EC', e: '🇪🇬', n: 'Flag For Egypt', f: 8, s: 'flag_eg' }, { u: '1F1F8-1F1FB', e: '🇸🇻', n: 'Flag For El Salvador', f: 8, s: 'flag_sv' }, { u: '1F1EC-1F1F6', e: '🇬🇶', n: 'Flag For Equatorial Guinea', f: 8, s: 'flag_gq' }, { u: '1F1EA-1F1F7', e: '🇪🇷', n: 'Flag For Eritrea', f: 8, s: 'flag_er' }, { u: '1F1EA-1F1EA', e: '🇪🇪', n: 'Flag For Estonia', f: 8, s: 'flag_ee' }, { u: '1F1EA-1F1F9', e: '🇪🇹', n: 'Flag For Ethiopia', f: 8, s: 'flag_et' }, { u: '1F1EA-1F1FA', e: '🇪🇺', n: 'Flag For European Union', f: 8, s: 'flag_eu' }, { u: '1F1EB-1F1F0', e: '🇫🇰', n: 'Flag For Falkland Islands', f: 8, s: 'flag_fk' }, { u: '1F1EB-1F1F4', e: '🇫🇴', n: 'Flag For Faroe Islands', f: 8, s: 'flag_fo' }, { u: '1F1EB-1F1EF', e: '🇫🇯', n: 'Flag For Fiji', f: 8, s: 'flag_fj' }, { u: '1F1EB-1F1EE', e: '🇫🇮', n: 'Flag For Finland', f: 8, s: 'flag_fi' }, { u: '1F1EB-1F1F7', e: '🇫🇷', n: 'Flag For France', f: 8, s: 'flag_fr' }, { u: '1F1EC-1F1EB', e: '🇬🇫', n: 'Flag For French Guiana', f: 8, s: 'flag_gf' }, { u: '1F1F5-1F1EB', e: '🇵🇫', n: 'Flag For French Polynesia', f: 8, s: 'flag_pf' }, { u: '1F1F9-1F1EB', e: '🇹🇫', n: 'Flag For French Southern Territories', f: 8 }, { u: '1F1EC-1F1E6', e: '🇬🇦', n: 'Flag For Gabon', f: 8, s: 'flag_ga' }, { u: '1F1EC-1F1F2', e: '🇬🇲', n: 'Flag For Gambia', f: 8, s: 'flag_gm' }, { u: '1F1EC-1F1EA', e: '🇬🇪', n: 'Flag For Georgia', f: 8, s: 'flag_ge' }, { u: '1F1E9-1F1EA', e: '🇩🇪', n: 'Flag For Germany', f: 8, s: 'flag_de' }, { u: '1F1EC-1F1ED', e: '🇬🇭', n: 'Flag For Ghana', f: 8, s: 'flag_gh' }, { u: '1F1EC-1F1EE', e: '🇬🇮', n: 'Flag For Gibraltar', f: 8, s: 'flag_gi' }, { u: '1F1EC-1F1F7', e: '🇬🇷', n: 'Flag For Greece', f: 8, s: 'flag_gr' }, { u: '1F1EC-1F1F1', e: '🇬🇱', n: 'Flag For Greenland', f: 8, s: 'flag_gl' }, { u: '1F1EC-1F1E9', e: '🇬🇩', n: 'Flag For Grenada', f: 8, s: 'flag_gd' }, { u: '1F1EC-1F1F5', e: '🇬🇵', n: 'Flag For Guadeloupe', f: 8, s: 'flag_gp' }, { u: '1F1EC-1F1FA', e: '🇬🇺', n: 'Flag For Guam', f: 8, s: 'flag_gu' }, { u: '1F1EC-1F1F9', e: '🇬🇹', n: 'Flag For Guatemala', f: 8, s: 'flag_gt' }, { u: '1F1EC-1F1EC', e: '🇬🇬', n: 'Flag For Guernsey', f: 8, s: 'flag_gg' }, { u: '1F1EC-1F1F3', e: '🇬🇳', n: 'Flag For Guinea', f: 8, s: 'flag_gn' }, { u: '1F1EC-1F1FC', e: '🇬🇼', n: 'Flag For Guinea-bissau', f: 8, s: 'flag_gw' }, { u: '1F1EC-1F1FE', e: '🇬🇾', n: 'Flag For Guyana', f: 8, s: 'flag_gy' }, { u: '1F1ED-1F1F9', e: '🇭🇹', n: 'Flag For Haiti', f: 8, s: 'flag_ht' }, { u: '1F1ED-1F1F3', e: '🇭🇳', n: 'Flag For Honduras', f: 8, s: 'flag_hn' }, { u: '1F1ED-1F1F0', e: '🇭🇰', n: 'Flag For Hong Kong', f: 8, s: 'flag_hk' }, { u: '1F1ED-1F1FA', e: '🇭🇺', n: 'Flag For Hungary', f: 8, s: 'flag_hu' }, { u: '1F1EE-1F1F8', e: '🇮🇸', n: 'Flag For Iceland', f: 8, s: 'flag_is' }, { u: '1F1EE-1F1F3', e: '🇮🇳', n: 'Flag For India', f: 8, s: 'flag_in' }, { u: '1F1EE-1F1E9', e: '🇮🇩', n: 'Flag For Indonesia', f: 8, s: 'flag_id' }, { u: '1F1EE-1F1F7', e: '🇮🇷', n: 'Flag For Iran', f: 8, s: 'flag_ir' }, { u: '1F1EE-1F1F6', e: '🇮🇶', n: 'Flag For Iraq', f: 8, s: 'flag_iq' }, { u: '1F1EE-1F1EA', e: '🇮🇪', n: 'Flag For Ireland', f: 8, s: 'flag_ie' }, { u: '1F1EE-1F1F2', e: '🇮🇲', n: 'Flag For Isle Of Man', f: 8, s: 'flag_im' }, { u: '1F1EE-1F1F1', e: '🇮🇱', n: 'Flag For Israel', f: 8, s: 'flag_il' }, { u: '1F1EE-1F1F9', e: '🇮🇹', n: 'Flag For Italy', f: 8, s: 'flag_it' }, { u: '1F1E8-1F1EE', e: '🇨🇮', n: 'Flag For Côte D’ivoire', f: 8, s: 'flag_ci' }, { u: '1F1EF-1F1F2', e: '🇯🇲', n: 'Flag For Jamaica', f: 8, s: 'flag_jm' }, { u: '1F1EF-1F1F5', e: '🇯🇵', n: 'Flag For Japan', f: 8, s: 'flag_jp' }, { u: '1F1EF-1F1EA', e: '🇯🇪', n: 'Flag For Jersey', f: 8, s: 'flag_je' }, { u: '1F1EF-1F1F4', e: '🇯🇴', n: 'Flag For Jordan', f: 8, s: 'flag_jo' }, { u: '1F1F0-1F1FF', e: '🇰🇿', n: 'Flag For Kazakhstan', f: 8, s: 'flag_kz' }, { u: '1F1F0-1F1EA', e: '🇰🇪', n: 'Flag For Kenya', f: 8, s: 'flag_ke' }, { u: '1F1F0-1F1EE', e: '🇰🇮', n: 'Flag For Kiribati', f: 8, s: 'flag_ki' }, { u: '1F1FD-1F1F0', e: '🇽🇰', n: 'Flag For Kosovo', f: 8, s: 'flag_xk' }, { u: '1F1F0-1F1FC', e: '🇰🇼', n: 'Flag For Kuwait', f: 8, s: 'flag_kw' }, { u: '1F1F0-1F1EC', e: '🇰🇬', n: 'Flag For Kyrgyzstan', f: 8, s: 'flag_kg' }, { u: '1F1F1-1F1E6', e: '🇱🇦', n: 'Flag For Laos', f: 8, s: 'flag_la' }, { u: '1F1F1-1F1FB', e: '🇱🇻', n: 'Flag For Latvia', f: 8, s: 'flag_lv' }, { u: '1F1F1-1F1E7', e: '🇱🇧', n: 'Flag For Lebanon', f: 8, s: 'flag_lb' }, { u: '1F1F1-1F1F8', e: '🇱🇸', n: 'Flag For Lesotho', f: 8, s: 'flag_ls' }, { u: '1F1F1-1F1F7', e: '🇱🇷', n: 'Flag For Liberia', f: 8, s: 'flag_lr' }, { u: '1F1F1-1F1FE', e: '🇱🇾', n: 'Flag For Libya', f: 8, s: 'flag_ly' }, { u: '1F1F1-1F1EE', e: '🇱🇮', n: 'Flag For Liechtenstein', f: 8, s: 'flag_li' }, { u: '1F1F1-1F1F9', e: '🇱🇹', n: 'Flag For Lithuania', f: 8, s: 'flag_lt' }, { u: '1F1F1-1F1FA', e: '🇱🇺', n: 'Flag For Luxembourg', f: 8, s: 'flag_lu' }, { u: '1F1F2-1F1F4', e: '🇲🇴', n: 'Flag For Macau', f: 8, s: 'flag_mo' }, { u: '1F1F2-1F1F0', e: '🇲🇰', n: 'Flag For Macedonia', f: 8, s: 'flag_mk' }, { u: '1F1F2-1F1EC', e: '🇲🇬', n: 'Flag For Madagascar', f: 8, s: 'flag_mg' }, { u: '1F1F2-1F1FC', e: '🇲🇼', n: 'Flag For Malawi', f: 8, s: 'flag_mw' }, { u: '1F1F2-1F1FE', e: '🇲🇾', n: 'Flag For Malaysia', f: 8, s: 'flag_my' }, { u: '1F1F2-1F1FB', e: '🇲🇻', n: 'Flag For Maldives', f: 8, s: 'flag_mv' }, { u: '1F1F2-1F1F1', e: '🇲🇱', n: 'Flag For Mali', f: 8, s: 'flag_ml' }, { u: '1F1F2-1F1F9', e: '🇲🇹', n: 'Flag For Malta', f: 8, s: 'flag_mt' }, { u: '1F1F2-1F1ED', e: '🇲🇭', n: 'Flag For Marshall Islands', f: 8, s: 'flag_mh' }, { u: '1F1F2-1F1F6', e: '🇲🇶', n: 'Flag For Martinique', f: 8, s: 'flag_mq' }, { u: '1F1F2-1F1F7', e: '🇲🇷', n: 'Flag For Mauritania', f: 8, s: 'flag_mr' }, { u: '1F1F2-1F1FA', e: '🇲🇺', n: 'Flag For Mauritius', f: 8, s: 'flag_mu' }, { u: '1F1FE-1F1F9', e: '🇾🇹', n: 'Flag For Mayotte', f: 8, s: 'flag_yt' }, { u: '1F1F2-1F1FD', e: '🇲🇽', n: 'Flag For Mexico', f: 8, s: 'flag_mx' }, { u: '1F1EB-1F1F2', e: '🇫🇲', n: 'Flag For Micronesia', f: 8, s: 'flag_fm' }, { u: '1F1F2-1F1E9', e: '🇲🇩', n: 'Flag For Moldova', f: 8, s: 'flag_md' }, { u: '1F1F2-1F1E8', e: '🇲🇨', n: 'Flag For Monaco', f: 8, s: 'flag_mc' }, { u: '1F1F2-1F1F3', e: '🇲🇳', n: 'Flag For Mongolia', f: 8, s: 'flag_mn' }, { u: '1F1F2-1F1EA', e: '🇲🇪', n: 'Flag For Montenegro', f: 8, s: 'flag_me' }, { u: '1F1F2-1F1F8', e: '🇲🇸', n: 'Flag For Montserrat', f: 8, s: 'flag_ms' }, { u: '1F1F2-1F1E6', e: '🇲🇦', n: 'Flag For Morocco', f: 8, s: 'flag_ma' }, { u: '1F1F2-1F1FF', e: '🇲🇿', n: 'Flag For Mozambique', f: 8, s: 'flag_mz' }, { u: '1F1F2-1F1F2', e: '🇲🇲', n: 'Flag For Myanmar', f: 8, s: 'flag_mm' }, { u: '1F1F3-1F1E6', e: '🇳🇦', n: 'Flag For Namibia', f: 8, s: 'flag_na' }, { u: '1F1F3-1F1F7', e: '🇳🇷', n: 'Flag For Nauru', f: 8, s: 'flag_nr' }, { u: '1F1F3-1F1F5', e: '🇳🇵', n: 'Flag For Nepal', f: 8, s: 'flag_np' }, { u: '1F1F3-1F1F1', e: '🇳🇱', n: 'Flag For Netherlands', f: 8, s: 'flag_nl' }, { u: '1F1F3-1F1E8', e: '🇳🇨', n: 'Flag For New Caledonia', f: 8, s: 'flag_nc' }, { u: '1F1F3-1F1FF', e: '🇳🇿', n: 'Flag For New Zealand', f: 8, s: 'flag_nz' }, { u: '1F1F3-1F1EE', e: '🇳🇮', n: 'Flag For Nicaragua', f: 8, s: 'flag_ni' }, { u: '1F1F3-1F1EA', e: '🇳🇪', n: 'Flag For Niger', f: 8, s: 'flag_ne' }, { u: '1F1F3-1F1EC', e: '🇳🇬', n: 'Flag For Nigeria', f: 8, s: 'flag_ng' }, { u: '1F1F3-1F1FA', e: '🇳🇺', n: 'Flag For Niue', f: 8, s: 'flag_nu' }, { u: '1F1F3-1F1EB', e: '🇳🇫', n: 'Flag For Norfolk Island', f: 8, s: 'flag_nf' }, { u: '1F1F2-1F1F5', e: '🇲🇵', n: 'Flag For Northern Mariana Islands', f: 8, s: 'flag_mp' }, { u: '1F1F0-1F1F5', e: '🇰🇵', n: 'Flag For North Korea', f: 8, s: 'flag_kp' }, { u: '1F1F3-1F1F4', e: '🇳🇴', n: 'Flag For Norway', f: 8, s: 'flag_no' }, { u: '1F1F4-1F1F2', e: '🇴🇲', n: 'Flag For Oman', f: 8, s: 'flag_om' }, { u: '1F1F5-1F1F0', e: '🇵🇰', n: 'Flag For Pakistan', f: 8, s: 'flag_pk' }, { u: '1F1F5-1F1FC', e: '🇵🇼', n: 'Flag For Palau', f: 8, s: 'flag_pw' }, { u: '1F1F5-1F1F8', e: '🇵🇸', n: 'Flag For Palestinian Territories', f: 8, s: 'flag_ps' }, { u: '1F1F5-1F1E6', e: '🇵🇦', n: 'Flag For Panama', f: 8, s: 'flag_pa' }, { u: '1F1F5-1F1EC', e: '🇵🇬', n: 'Flag For Papua New Guinea', f: 8, s: 'flag_pg' }, { u: '1F1F5-1F1FE', e: '🇵🇾', n: 'Flag For Paraguay', f: 8, s: 'flag_py' }, { u: '1F1F5-1F1EA', e: '🇵🇪', n: 'Flag For Peru', f: 8, s: 'flag_pe' }, { u: '1F1F5-1F1ED', e: '🇵🇭', n: 'Flag For Philippines', f: 8, s: 'flag_ph' }, { u: '1F1F5-1F1F3', e: '🇵🇳', n: 'Flag For Pitcairn Islands', f: 8, s: 'flag_pn' }, { u: '1F1F5-1F1F1', e: '🇵🇱', n: 'Flag For Poland', f: 8, s: 'flag_pl' }, { u: '1F1F5-1F1F9', e: '🇵🇹', n: 'Flag For Portugal', f: 8, s: 'flag_pt' }, { u: '1F1F5-1F1F7', e: '🇵🇷', n: 'Flag For Puerto Rico', f: 8, s: 'flag_pr' }, { u: '1F1F6-1F1E6', e: '🇶🇦', n: 'Flag For Qatar', f: 8, s: 'flag_qa' }, { u: '1F1F7-1F1EA', e: '🇷🇪', n: 'Flag For Réunion', f: 8, s: 'flag_re' }, { u: '1F1F7-1F1F4', e: '🇷🇴', n: 'Flag For Romania', f: 8, s: 'flag_ro' }, { u: '1F1F7-1F1FA', e: '🇷🇺', n: 'Flag For Russia', f: 8, s: 'flag_ru' }, { u: '1F1F7-1F1FC', e: '🇷🇼', n: 'Flag For Rwanda', f: 8, s: 'flag_rw' }, { u: '1F1E7-1F1F1', e: '🇧🇱', n: 'Flag For St. Barthélemy', f: 8, s: 'flag_bl' }, { u: '1F1F8-1F1ED', e: '🇸🇭', n: 'Flag For St. Helena', f: 8, s: 'flag_sh' }, { u: '1F1F0-1F1F3', e: '🇰🇳', n: 'Flag For St. Kitts & Nevis', f: 8, s: 'flag_kn' }, { u: '1F1F1-1F1E8', e: '🇱🇨', n: 'Flag For St. Lucia', f: 8, s: 'flag_lc' }, { u: '1F1F5-1F1F2', e: '🇵🇲', n: 'Flag For St. Pierre & Miquelon', f: 8, s: 'flag_pm' }, { u: '1F1FB-1F1E8', e: '🇻🇨', n: 'Flag For St. Vincent & Grenadines', f: 8, s: 'flag_vc' }, { u: '1F1FC-1F1F8', e: '🇼🇸', n: 'Flag For Samoa', f: 8, s: 'flag_ws' }, { u: '1F1F8-1F1F2', e: '🇸🇲', n: 'Flag For San Marino', f: 8, s: 'flag_sm' }, { u: '1F1F8-1F1F9', e: '🇸🇹', n: 'Flag For São Tomé & Príncipe', f: 8, s: 'flag_st' }, { u: '1F1F8-1F1E6', e: '🇸🇦', n: 'Flag For Saudi Arabia', f: 8, s: 'flag_sa' }, { u: '1F1F8-1F1F3', e: '🇸🇳', n: 'Flag For Senegal', f: 8, s: 'flag_sn' }, { u: '1F1F7-1F1F8', e: '🇷🇸', n: 'Flag For Serbia', f: 8, s: 'flag_rs' }, { u: '1F1F8-1F1E8', e: '🇸🇨', n: 'Flag For Seychelles', f: 8, s: 'flag_sc' }, { u: '1F1F8-1F1F1', e: '🇸🇱', n: 'Flag For Sierra Leone', f: 8, s: 'flag_sl' }, { u: '1F1F8-1F1EC', e: '🇸🇬', n: 'Flag For Singapore', f: 8, s: 'flag_sg' }, { u: '1F1F8-1F1FD', e: '🇸🇽', n: 'Flag For Sint Maarten', f: 8, s: 'flag_sx' }, { u: '1F1F8-1F1F0', e: '🇸🇰', n: 'Flag For Slovakia', f: 8, s: 'flag_sk' }, { u: '1F1F8-1F1EE', e: '🇸🇮', n: 'Flag For Slovenia', f: 8, s: 'flag_si' }, { u: '1F1F8-1F1E7', e: '🇸🇧', n: 'Flag For Solomon Islands', f: 8, s: 'flag_sb' }, { u: '1F1F8-1F1F4', e: '🇸🇴', n: 'Flag For Somalia', f: 8, s: 'flag_so' }, { u: '1F1FF-1F1E6', e: '🇿🇦', n: 'Flag For South Africa', f: 8, s: 'flag_za' }, { u: '1F1EC-1F1F8', e: '🇬🇸', n: 'Flag For South Georgia & South Sandwich Islands', f: 8, s: 'flag_gs' }, { u: '1F1F0-1F1F7', e: '🇰🇷', n: 'Flag For South Korea', f: 8, s: 'flag_kr' }, { u: '1F1F8-1F1F8', e: '🇸🇸', n: 'Flag For South Sudan', f: 8, s: 'flag_ss' }, { u: '1F1EA-1F1F8', e: '🇪🇸', n: 'Flag For Spain', f: 8, s: 'flag_es' }, { u: '1F1F1-1F1F0', e: '🇱🇰', n: 'Flag For Sri Lanka', f: 8, s: 'flag_lk' }, { u: '1F1F8-1F1E9', e: '🇸🇩', n: 'Flag For Sudan', f: 8, s: 'flag_sd' }, { u: '1F1F8-1F1F7', e: '🇸🇷', n: 'Flag For Suriname', f: 8, s: 'flag_sr' }, { u: '1F1F8-1F1FF', e: '🇸🇿', n: 'Flag For Swaziland', f: 8, s: 'flag_sz' }, { u: '1F1F8-1F1EA', e: '🇸🇪', n: 'Flag For Sweden', f: 8, s: 'flag_se' }, { u: '1F1E8-1F1ED', e: '🇨🇭', n: 'Flag For Switzerland', f: 8, s: 'flag_ch' }, { u: '1F1F8-1F1FE', e: '🇸🇾', n: 'Flag For Syria', f: 8, s: 'flag_sy' }, { u: '1F1F9-1F1FC', e: '🇹🇼', n: 'Flag For Taiwan', f: 8, s: 'flag_tw' }, { u: '1F1F9-1F1EF', e: '🇹🇯', n: 'Flag For Tajikistan', f: 8, s: 'flag_tj' }, { u: '1F1F9-1F1FF', e: '🇹🇿', n: 'Flag For Tanzania', f: 8, s: 'flag_tz' }, { u: '1F1F9-1F1ED', e: '🇹🇭', n: 'Flag For Thailand', f: 8, s: 'flag_th' }, { u: '1F1F9-1F1F1', e: '🇹🇱', n: 'Flag For Timor-leste', f: 8, s: 'flag_tl' }, { u: '1F1F9-1F1EC', e: '🇹🇬', n: 'Flag For Togo', f: 8, s: 'flag_tg' }, { u: '1F1F9-1F1F0', e: '🇹🇰', n: 'Flag For Tokelau', f: 8, s: 'flag_tk' }, { u: '1F1F9-1F1F4', e: '🇹🇴', n: 'Flag For Tonga', f: 8, s: 'flag_to' }, { u: '1F1F9-1F1F9', e: '🇹🇹', n: 'Flag For Trinidad & Tobago', f: 8, s: 'flag_tt' }, { u: '1F1F9-1F1F3', e: '🇹🇳', n: 'Flag For Tunisia', f: 8, s: 'flag_tn' }, { u: '1F1F9-1F1F7', e: '🇹🇷', n: 'Flag For Turkey', f: 8, s: 'flag_tr' }, { u: '1F1F9-1F1F2', e: '🇹🇲', n: 'Flag For Turkmenistan', f: 8, s: 'flag_tm' }, { u: '1F1F9-1F1E8', e: '🇹🇨', n: 'Flag For Turks & Caicos Islands', f: 8, s: 'flag_tc' }, { u: '1F1F9-1F1FB', e: '🇹🇻', n: 'Flag For Tuvalu', f: 8, s: 'flag_tv' }, { u: '1F1FA-1F1EC', e: '🇺🇬', n: 'Flag For Uganda', f: 8, s: 'flag_ug' }, { u: '1F1FA-1F1E6', e: '🇺🇦', n: 'Flag For Ukraine', f: 8, s: 'flag_ua' }, { u: '1F1E6-1F1EA', e: '🇦🇪', n: 'Flag For United Arab Emirates', f: 8, s: 'flag_ae' }, { u: '1F1EC-1F1E7', e: '🇬🇧', n: 'Flag For United Kingdom', f: 8, s: 'flag_gb' }, { u: '1F1FA-1F1F8', e: '🇺🇸', n: 'Flag For United States', f: 8, s: 'flag_us' }, { u: '1F1FB-1F1EE', e: '🇻🇮', n: 'Flag For U.S. Virgin Islands', f: 8, s: 'flag_vi' }, { u: '1F1FA-1F1FE', e: '🇺🇾', n: 'Flag For Uruguay', f: 8, s: 'flag_uy' }, { u: '1F1FA-1F1FF', e: '🇺🇿', n: 'Flag For Uzbekistan', f: 8, s: 'flag_uz' }, { u: '1F1FB-1F1FA', e: '🇻🇺', n: 'Flag For Vanuatu', f: 8, s: 'flag_vu' }, { u: '1F1FB-1F1E6', e: '🇻🇦', n: 'Flag For Vatican City', f: 8, s: 'flag_va' }, { u: '1F1FB-1F1EA', e: '🇻🇪', n: 'Flag For Venezuela', f: 8, s: 'flag_ve' }, { u: '1F1FB-1F1F3', e: '🇻🇳', n: 'Flag For Vietnam', f: 8, s: 'flag_vn' }, { u: '1F1FC-1F1EB', e: '🇼🇫', n: 'Flag For Wallis & Futuna', f: 8, s: 'flag_wf' }, { u: '1F1EA-1F1ED', e: '🇪🇭', n: 'Flag For Western Sahara', f: 8, s: 'flag_eh' }, { u: '1F1FE-1F1EA', e: '🇾🇪', n: 'Flag For Yemen', f: 8, s: 'flag_ye' }, { u: '1F1FF-1F1F2', e: '🇿🇲', n: 'Flag For Zambia', f: 8, s: 'flag_zm' }, { u: '1F1FF-1F1FC', e: '🇿🇼', n: 'Flag For Zimbabwe', f: 8, s: 'flag_zw' }, { u: '1F1E6-1F1E8', e: '🇦🇨', n: 'Flag For Ascension Island', f: 8, s: 'flag_ac' }, { u: '1F1E7-1F1FB', e: '🇧🇻', n: 'Flag For Bouvet Island', f: 8, s: 'flag_bv' }, { u: '1F1E8-1F1F5', e: '🇨🇵', n: 'Flag For Clipperton Island', f: 8, s: 'flag_cp' }, { u: '1F1E9-1F1EC', e: '🇩🇬', n: 'Flag For Diego Garcia', f: 8, s: 'flag_dg' }, { u: '1F1EA-1F1E6', e: '🇪🇦', n: 'Flag For Ceuta & Melilla', f: 8, s: 'flag_ea' }, { u: '1F1ED-1F1F2', e: '🇭🇲', n: 'Flag For Heard & Mcdonald Islands', f: 8, s: 'flag_hm' }, { u: '1F1F2-1F1EB', e: '🇲🇫', n: 'Flag For St. Martin', f: 8, s: 'flag_mf' }, { u: '1F1F8-1F1EF', e: '🇸🇯', n: 'Flag For Svalbard & Jan Mayen', f: 8, s: 'flag_sj' }, { u: '1F1F9-1F1E6', e: '🇹🇦', n: 'Flag For Tristan Da Cunha', f: 8, s: 'flag_ta' }, { u: '1F1FA-1F1F2', e: '🇺🇲', n: 'Flag For U.S. Outlying Islands', f: 8, s: 'flag_um' }, { u: '1F3FB', e: '🏻', n: 'Emoji Modifier Fitzpatrick Type-1-2', f: 9 }, { u: '1F3FC', e: '🏼', n: 'Emoji Modifier Fitzpatrick Type-3', f: 9 }, { u: '1F3FD', e: '🏽', n: 'Emoji Modifier Fitzpatrick Type-4', f: 9 }, { u: '1F3FE', e: '🏾', n: 'Emoji Modifier Fitzpatrick Type-5', f: 9 }, { u: '1F3FF', e: '🏿', n: 'Emoji Modifier Fitzpatrick Type-6', f: 9 }];
var emojiFaceMap = {};
var emojiTitleMap = {};
for (var i = 0; i < table.length; i++) {
    if (table[i].s) {
        emojiFaceMap[table[i].u.toLowerCase()] = {
            code: table[i].u,
            title: table[i].s
        };
        if (table[i].u.indexOf('-') == -1) {
            emojiTitleMap[table[i].s] = {
                code: table[i].u,
                title: table[i].s
            }
        };
    }
}
function handlerChatList(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].index === undefined) {
            list[i].index = i;
        }
    }
    list.sort(function (v1, v2) {
        if (v1.Sticky != v2.Sticky) {
            return v1.Sticky > v2.Sticky ? -1 : 1;
        } else {
            if (v1.ActiveTimestamp == v2.ActiveTimestamp) {
                if (v1.MsgTimestamp == v2.MsgTimestamp) {
                    return v1.index > v2.index ? 1 : -1;
                }
                return v1.MsgTimestamp > v2.MsgTimestamp ? -1 : 1;
            } else {
                return v1.ActiveTimestamp > v2.ActiveTimestamp ? -1 : 1;
            }
        }
    })
    return list;
};
// 公共服务 处理
export default {
    langPack() {
        var lang = utils.getLs('lang') || 'cn';
        var LANGMAP = {
            cn: {
                langName: '中文',
                unsupport: '不支持此浏览器',
                unsupportAd: '建议使用Chrome或者FirefoX浏览器',
                appName: '静静办公',
                newMessage: '有新的消息',

                countryArea: '国家/地区',
                phone: '手机号码',
                phone2: '手机号码',
                password: '密码',
                captcha: '验证码',
                loginButton: '登录',
                InvitationCode: '邀请码',
                forget: '忘记密码?',
                forgetTitle: '忘记密码',
                forgetInfo: '修改登录密码请联系以下人员：',
                tel: '电话：',
                wechat: '微信：',
                QQ: 'QQ：',
                forgetLine1: '使用静静办公APP，找回密码（注册/登录界面，点击忘记密码按钮）',
                forgetLine2: '也可扫描下方二维码下载静静办公APP',

                search: '搜索',
                message: '消息',
                concat: '联系人',
                organize: '组织架构',
                department: '部门',
                loadmore: '加载更多',

                startChat: '发起群聊',
                fcontacts: '常用联系人',
                rcontacts: '最近联系人',
                friends: '我的好友',
                maxNum: '注意：本次选择人数已达上限',
                forwardTitle: '转发消息',
                addStaff: '添加成员',
                videoConference: '[视频会议]',
                BookAVideoConference: '[预约视频会议]',
                noResult: '没有搜索到相关人员',
                noFrequentContacts: '没有常用联系人',
                noGroupChat: '没有群聊',
                noRecentContacts: '没有最近联系人',
                noFirends: '没有好友',
                expand: '展开',
                collapse: '收起',
                mineGroup: '我的群聊',

                turnOffNotif: '关闭桌面通知',
                turnOnNotif: '开启桌面通知',
                turnOffSounds: '关闭声音提示',
                turnOnSounds: '开启声音提示',
                downloadApp: '下载应用',
                updatePersonnel: '更新组织架构',
                exit: '退出应用',

                setTop: '置顶聊天',
                cancelTop: '取消置顶',
                deleteChat: '移除',
                removeChat: '移除并删除消息',
                removeChatConfirm: '确定要移除该聊天并删除该聊天的所有聊天记录？',
                forward: '转发',
                copy: '复制',

                groupName: '群聊名称',
                saveToContacts: '保存到通讯录',
                stickOnTop: '消息置顶',
                groupInfo: '群聊详情',
                groupOwner: '群主',
                leaveGroup: '离开了群聊',

                profile: '详情',
                firendProfile: '好友详情',
                manager: '直接主管',
                profileDepartment: '所在部门',
                sendMessage: '发消息',
                sendEmail: '发邮件',
                sendGroupEmail: '群发邮件',

                loginFail: '登录失败，请确定手机号密码正确',
                failCreateRoom: '群聊创建失败',
                audioFailed: '语音播放失败',
                videoFailed: '视频播放失败',
                maxUpload: '文件上传最多支持',
                mb: 'MB',
                zeroFile: '文件大小为0，无法上传',
                maxMembers: '无法创建超过80人的群组聊天',
                selectStaff: '请选择要转发的人员',
                confirmForward: '确定要转发给这些人？',
                errorGroupName: '群聊名称在0-16个字符',
                errorEmjgroupName: '群聊名称不支持表情',
                leaveError: '创建者无法退出群聊',
                uploading: '图片上传中，请稍后',
                imageError: '无法加载图片',
                unknownPhone: '该手机号未注册',
                unknownLoginError: '登录异常，请联系管理员',
                incorrectPhone: '请输入正确的手机号码',
                sendMsgTips: '按下Ctrl+Enter换行',
                closeBrowser: '关闭浏览器聊天内容将会丢失。',
                webuploaderError: 'webuploader出错，请重试。',
                loginInOther: '相同账号在其他地方登录,您已退出!',

                xxpb: '',
                xxpe: '人',

                downloadViewTitle: '下载静静办公',
                scanQr: '手机扫一扫下载静静办公',
                downloadTips: '(iPhone,安卓客户端下载)',

                uploadingViewTitle: '发送图片',

                am: '上午',
                pm: '下午',
                draft: '[草稿]',
                someoneAt: '[有人＠我]',
                atedby: '提到了你',
                changeGroupName: '修改群名为',
                removedMember: '被移出群聊',
                removedMemberAdminStart: '您将',
                removedMemberAdminEnd: '移出群聊',
                leftGroup: '离开群聊',
                addGroup: '加入群聊',
                invitedIntoGroup: '邀请了',
                invitedIntoGroupEnd: '加入群聊',
                you: '您',
                download: '下载',

                file: '[文件]',
                img: '[图片]',
                video: '[视频]',
                audio: '[语音]',
                link: '[链接]',

                languageSettingTitle: '语言设置',
                languageSettingTip: '点击图片设置语言',
                languageSettingTitle1: 'language setting',

                joinEnt: '加入了',
                inviteEnt: '邀请你加入公司',
                voiceConference: '语音会议',
                invitedIntoMetting: ' 邀请你参加语音会议，请在手机上加入。',
                invitedIntoMettingInSender: '发起了语音会议，请在手机上查看。',
                invitedVideoconferencing: ' 邀请你参加视频会议。',
                invitedVideoconferencingInSender: ' 发起了视频会议。',
                seeInMobile: '请在手机上查看。',

                loading: '加载中 ...',
                serviceNumber: '服务号',
                noChat: '还没有任何聊天记录',
                start: '发起聊天',
                send: '发送',
                cancel: '取消',
                back: '返回',
                group: '群组',
                rgroup: '常用群组',
                confirm: '确定',

                userName: '姓名',
                userPost: '职位',
                userEntEmail: '公司邮箱',
                userEmpNo: '工号',
                userAddress: '地址',
                userDept: '组织架构',
                userLeader: '直接主管',
                weekDays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                yesterday: '昨天',
                thedaybeforeyesterday: '前天',
                stranger: '陌生人',
                broad: '广播消息',
                addToFriends: '加为好友',
                addToFrequents: '加入常用联系人',
                removeFriends: '删除好友',
                removeFrequents: '删除联系人',
                msgdisturb: '消息免打扰',
                noSign: '这家伙很懒，什么都没有留下...',
                shutUpAction: '被{name}禁言',
                shutUpWarn: '被{name}禁言，请稍后重试',
                minutes: '分钟',
                forever: '永久',
                shutUpForever: '已被群主永久禁言',
                cancelShutUp: '的禁言已被取消',
                banned: '禁言',
                loginFail: '手机号或密码不正确',
                requestError: '请求出错，请稍后重试',
                connectServer: '连接服务器...',
                connectSuccess: '服务器连接成功',
                connectFail: '服务器连接失败',
                afterSSOSuccess: '验证成功，连接聊天服务器',
                loginSuccess: '聊天服务器连接成功，等待界面初始化',
                sessionExpired: '身份过期请重新登录',
                chatServerTimeout: '聊天服务器连接超时，请稍后重试',
                downApp: '下载静静办公',
                companyLogin: '企业登录',
                appNameWeb: '静静办公网页版',
                china: '中国',
                taiwan: '台湾',
                usa: '美国',
                korea: '韩国',
                russia: '俄罗斯',
                japan: '日本',
                deptLoading: '组织架构加载中...',
                withDrawMsg: '撤回了一条消息',
                withDraw: '撤回',
                canNotWithDraw: '超过2分钟无法撤回',
                privacyAttention: '与您不是好友或同事，请您注意保护隐私',
                loadMoreMsg: '更多消息请在聊天记录中查看',
                openRecords: '打开消息记录',
                seeDetail: '查看详情',

                cancelUpload: '取消上传',
                reupload: '重新上传',
                open: '打开',
                openDir: '打开文件夹',
                fileCacheDay: '文件暂存7天',
                receiverDonwloaded: '对方已接收',
                fileSendFail: '文件发送失败',

                cancelDownload: '取消下载',
                reDownload: '重新下载',
                cancelTrans: '传输已取消',
                downloaded: '接收成功',
                downloadFail: '下载失败',
                transFail: '传输失败',
                saveAs: '另存为',
                fileOutOfDay: '文件已过期',
                allFiles: '所有文件|*.*',
                imageFiles: '图片文件|*.png;*.jpg;*.gif',

                setting: '设置',
                about: '关于',
                switchAccount: '切换账号',
                quit: '退出',

                serviceAccount: '服务号',
                fdepts: '常用部门',
                fgroups: '常用群聊',
                entCharger: '企业负责人',
                entEmpCount: '企业总人数',

                deptLeader: '部门主管',
                deptDirector: '分管领导',
                deptEmpCount: '部门人数',
                noEmp: '暂无',

                'ent.userName': '姓名',
                'ent.job': '职位',
                'ent.email': '企业邮箱',
                'ent.empNo': '工号',
                'ent.depts': '组织架构',
                'ent.leader': '直接主管',
                'user.userName': '姓名',
                'user.mobile': '电话',
                'user.email': '邮箱',
                'user.noSignature': '这家伙很懒,什么都没有留下...',

                favoriteDept: '添加常用部门',
                favoriteEmp: '添加常用联系人',
                sendInstantMessage: '发送即时消息',
                refreshEnts: '刷新组织架构',

                setUserToFavorite: '添加常用联系人',
                setGroupToFavorite: '添加常用群聊',
                cancelUserToFavorite: '移除常用联系人',
                cancelGroupToFavorite: '移除常用群聊',
                cancelDeptToFavorite: '移除常用部门',

                goback: '<返回',
                broadDetailTitle: '广播详情',

                quitGroup: '退出群聊',
                chooseUser: '选择群聊成员',
                vidioMeeting: '视频会议',
                voiceConference: '语音会议',
                selectedUsers: '已选择成员：',
                selectedUsersUnit: '人',

                clickToEditEmail: '点击编辑邮箱',

                account: '账号',
                serviceLogin: '服务号登录',
                autoLogin: '自动登录',
                resetPwd: '重置密码',
                pwdLogin: '密码登录',
                register: '注册',
                smsCode: '验证码',
                wrongSmsCode: '验证码错误',
                blankSmsCode: '请输入验证码',
                diffPassword: '两次输入的密码不一致',
                alreadyInUse: '手机号已经被使用',
                writeInvitationCode: '请填写邀请码',
                finish: '完成',
                next: '下一步',
                skip: '跳过',
                getCode: '获取验证码',
                countDown: '{d}秒后重新获取',
                newPwd: '新密码',
                confirmNewPwd: '再次输入新密码',
                confirmPwd: '确认密码',
                repeatPwd: '再次输入密码',

                safeTipTitle: '安全提示',
                safeTipContentLine1: '公共环境请勿开启自动登录功能，',
                safeTipContentLine2: '以免数据泄露',
                donNotOpen: '不开启',
                confirmOpen: '确认开启',

                forgetPwdTitle: '忘记密码',
                forgetPwdContentLine1: '请通知总管理员，登录管理后台重置',
                forgetPwdContentLine2: '密码http://mgr.jj.snail.com',
                getThat: '我知道了',

                loadEntError: '组织架构加载错误',
                clickToRetry: '点此重新加载',

                'setting.login': '登录',
                'setting.hotkey': '热键',
                'setting.sound': '声音',
                'setting.backup': '聊天备份',
                autoStart: '开机自动启动',
                getMsg: '提取消息',
                showMainIframe: '显示主面板',
                capture: '捕捉屏幕',
                quickSend: '快速发送',
                recordingVoice: '语音按键说话',
                openChatHistory: '打开聊天记录',
                setToDefault: '恢复默认设置',
                sendMsgHotKey: '会话窗口发送消息',
                hasSameHotKey: '冲突',
                CESend: '按Ctrl+Enter键',
                ESend: 'Enter键',
                closeTone: '关闭消息提示音',
                backupToPC: '备份到电脑',
                backupBtn: '备份',
                recoverToPhone: '恢复到手机',
                recoverBtn: '恢复',
                managerBackup: '管理备份',
                managerBackupBtn: '管理',

                close: '关闭',
                scanQrCode: '扫二维码下载手机版',
                copyRight: '苏州蜗牛数字科技股份有限公司©版权所有',

                backupTips: '请在手机上确认，以开始备份',
                restoreTips: '请在手机上确认，以开始还原',
                managerTips: '小提示：修改备份存储目录将会迁移所有已存储的备份，暂不支持中文路径',
                currentBackUpDir: '备份存储位置目录：',
                modify: '更改',
                backupName: '备份名称',
                firstBackupTime: '首次备份时间',
                lastBackupTime: '上次备份时间',
                operate: '操作',
                deleteBackup: '删除备份',

                backupComplete: '备份已完成',
                restoreComplete: '传输已完成，请在手机上继续恢复',
                notCloseApp: '为了保证良好的网络链接，请不要关闭静静办公',
                transError: '传输出错，请重试',
                backuped: '已备份',
                restoreed: '已还原',

                sendFail: '[发送失败]',

                recording: '正在录音...',
                recordFinish: '录音完成',

                noMicroPhone: '未找到麦克风',
                noBroadcaster: '未找到播放设备',

                recentChat: '最近聊天',

                msgTooLong: '内容过长，请删除部分内容后重试',

                shareLink: '分享了一个链接',

                hasBeenShutup: '已被群主禁言，还剩 ',

                largeFileMsg: '[大文件]',
                largeFile: '大文件传输助手',
                largeFilePC: '大文件传输助手(仅局域网PC间)',
                largeFIleMsgTip: '(仅限同一局域网PC端接收)',
                receiveFileTitle: '来自{name}的接收事项',
                dragFileTips: '拖拽文件（文件夹）到此或者点击添加按钮',
                deleteFile: '删除',

                messageManager: '消息管理器',
                contacts: '联系人',
                addressBook: '通讯录',
                content: '内容',
                searchRange: '查找范围',

                all: '全部',
                recentOneMonth: '最近一个月',
                recentThreeMonth: '最近三个月',
                recentOneYear: '最近一年',

                searchText: '查看文本',
                searchFile: '查看文件',

                remark: '备注',
                notSupportSendFileDir: '对不起，暂时不支持发送文件夹。请使用大文件传送功能发送文件夹。',

                fileMsgHistory: '文件[{name}]，请在聊天窗口查看',

                allResult: '全部结果',

                imgView: '图片查看器',
                sourceSize: '实际尺寸',
                optimumSize: '最佳比例',
                zoomout: '放大',
                zoomin: '缩小',
                prevImg: '上一张',
                nextImg: '下一张',
                rotateAntiWise: '逆时针旋转90度',
                rotateWise: '顺时针旋转90度',
                saveImg: '保存',
                saveSuccess: '保存成功',
                imageLoadFail: '无法加载图片',
                lastImg: '已经是最后一张图片',
                firstImg: '已经是第一张图片',

                loadingMsg: '消息加载中',

                receiveStatus: '查看接收状态',
                receive: '接收',
                reject: '拒绝',
                cancelReceive: '取消接收',
                reReceive: '重新接收',
                stillReceive: '仍然接收',
                hasReject: '已拒绝',
                waitReceive: '等待接收',
                receiveError: '接收中断',
                receiveComplete: '已接收',
                intranetPicTips: '当前为内网环境，该图仅限内网用户查看',
                senderCancel: '发送方取消发送',
                cancelLargeFile: '取消发送',
                receiveCancel: '对方取消接收',
                cancelLargeFileMsgInSender: '您已取消发送大文件',
                cancelLargeFileMsgInReceiver: '已取消发送大文件',
                fileTransfering: '有文件正在传输，确定要退出？',

                unreadMsg: '条未读消息',
                newMsg: '条新消息',

                'btn.face': '插入表情',
                'btn.file': '发送文件',
                'btn.img': '插入图片',
                'btn.voice': '开始录音',
                'btn.capture': '截图',
                'btn.history': '消息记录',

                offlineTip: '静静已离线，请检查网络',

                paste: '粘贴',

                minwin: '最小化',
                restorewin: '向下还原',
                maxwin: '最大化',

                error107: '文件不存在',
                error108: '文件夹不存在',
                error8: '无法开启文件发送端口，请检查网络或防火墙设置',
                loginError100: '用户不存在',
                loginError12: '用户名或密码错误',
                loginError2: '用户名或密码错误',
                loginError10: '网络异常',
                loginError15: '您的账号已登录，无法重复登录。',
                loginError16: '请输入正确的验证码',
                noStaffs: '所选部门没有员工，无法创建群聊',
                saveImgPifx: '静静图片',
                leaveGroupConfirm: '是否确认退出该群？',
                imageWasWithDrawBySender: '图片已被撤回',
                noMessage: '没有聊天记录',
                noSearchMsg: '没有搜索到相关消息',
                outOfToken: '身份已过期，请重新登录。',
                clear: '清屏',
                cut: '剪切',
                deleteContent: '删除',
                fileTooLarge: '文件大小超过80M，请使用大文件传输助手发送',
                tooLargeFile: '存在超过80M的文件无法发送，请使用大文件传输助手发送'
            },
            en: {
                langName: 'English',
                unsupport: 'Browser not supported.',
                unsupportAd: 'Try Chrome or Firefox instead.',
                appName: '静静办公',
                newMessage: 'New Message',

                countryArea: 'Country/Area',
                phone: 'Mobile number',
                phone2: 'Phone',
                password: 'Password',
                InvitationCode: 'InvitationCode',
                captcha: '验证码',
                loginButton: 'Log in',

                forget: 'Forgot password?',
                forgetTitle: 'Forgot password',
                forgetInfo: 'To change your password, contact the following staff:',
                tel: 'Tel:',
                wechat: 'Wechat:',
                QQ: 'QQ:',
                forgetLine1: 'Use Snail IM App,recover your password by clicking Forgot Password;Scan the QR Code and download the app now!',
                forgetLine2: '',

                search: 'Search',
                message: 'Message',
                concat: 'Contacts',
                organize: 'Personnel',
                department: 'Department',
                loadmore: 'More',

                startChat: 'Group chat',
                fcontacts: 'Frequent contacts',
                rcontacts: 'Recent contacts',
                friends: 'Friends',
                maxNum: 'Maximum number of members reached',
                forwardTitle: 'Forward',
                addStaff: 'Add staff',
                videoConference: 'video conference',
                BookAVideoConference: 'Book a video conference',
                noResult: 'No results found',
                noFrequentContacts: 'No frequent contacts found',
                noGroupChat: 'No group chats found',
                noRecentContacts: 'No recent contacts found',
                noFirends: 'No friends found',
                expand: 'Expand',
                collapse: 'Collapse',
                mineGroup: 'Mine Groups',

                turnOffNotif: 'Turn off notifications',
                turnOnNotif: 'Turn on notifications',
                turnOffSounds: 'Turn off notifications sounds',
                turnOnSounds: 'Turn on notifications sounds',
                downloadApp: 'Download app',
                updatePersonnel: 'Update personnel',
                exit: 'Exit',

                setTop: 'Stick on top',
                cancelTop: 'Remove from top',
                deleteChat: 'Remove',
                removeChat: '移除并删除消息',
                removeChatConfirm: '确定要移除该聊天并删除该聊天的所有聊天记录？',
                forward: 'Forward',
                copy: 'Copy',

                groupName: 'Group name',
                saveToContacts: 'Save to contacts',
                stickOnTop: 'Stick on top',
                groupInfo: 'Chat history',
                groupOwner: 'Owner',
                leaveGroup: 'Leave',

                profile: 'Profile',
                firendProfile: 'Friend Profile',
                manager: 'Manager',
                profileDepartment: 'Department',
                sendMessage: 'Send message',
                sendEmail: 'Send email',
                sendGroupEmail: 'Send group email',

                loginFail: 'Incorrect phone number or password',
                failCreateRoom: 'Failed to create group',
                audioFailed: 'Failed to play the audio',
                videoFailed: 'Failed to play the video',
                maxUpload: 'Upload a file no larger than',
                mb: 'MB',
                zeroFile: 'Incorrect file size. Unable to upload.',
                maxMembers: 'The maximum number of members is 80',
                selectStaff: 'Select a staff',
                confirmForward: 'Are you sure that you want to forward the message?',
                errorGroupName: 'Group name must be no more than 16 characters',
                errorEmjgroupName: 'Group name does not support emoji',
                leaveError: 'Group leader cannot leave the group',
                uploading: 'Uploading pictures…',
                imageError: 'Failed to load pictures',
                unknownPhone: 'This phone number has not been registered yet.',
                unknownLoginError: 'Unknown error. Contact the Admin.',
                incorrectPhone: 'Incorrect phone number',
                sendMsgTips: 'Press Ctrl-Enter to start a new line',
                closeBrowser: 'You\'ll lose your chats after closing the browser.',
                webuploaderError: 'Webuploader error. Try again later.',
                loginInOther: '相同账号在其他地方登录,您已退出!',

                xxpb: '(',
                xxpe: ')',

                downloadViewTitle: 'Downloads IM App',
                scanQr: 'Scan the QR Code and download now!',
                downloadTips: '(Available on iOS and Android)',

                uploadingViewTitle: 'Send picture',

                am: 'A.M.',
                pm: 'P.M.',
                draft: '[Draft]',
                someoneAt: '[Someone mentioned me]',
                atedby: ' mentioned you',
                changeGroupName: ' has changed the group name to',
                removedMember: ' was removed out of the group',
                removedMemberAdminStart: 'You removed ',
                removedMemberAdminEnd: ' out of the group',
                leftGroup: ' left the group',
                addGroup: ' were added to the group',
                invitedIntoGroup: ' have invited ',
                invitedIntoGroupEnd: ' into the group',
                you: 'You',
                download: 'Download',

                file: '[File]',
                img: '[Image]',
                video: '[Video]',
                audio: '[Audio]',
                link: '[Link]',

                languageSettingTitle: 'Language Setting',
                languageSettingTip: 'Click image to set Language',
                languageSettingTitle1: '语言设置',

                joinEnt: '加入了',
                inviteEnt: '邀请你加入公司',
                voiceConference: 'Voice conference',
                invitedIntoMetting: ' attend voice conference , please check on your mobile phone.',
                invitedIntoMettingInSender: ' 发起了语音会议，请在手机上查看。',
                seeInMobile: 'please check it on your phone.',

                loading: 'loading...',
                serviceNumber: 'Service number',
                noChat: 'No Content',
                start: 'Get Start',
                send: 'Send',
                cancel: 'Cancel',
                back: 'Back',
                group: 'Group',
                confirm: 'Confirm',

                userName: 'Name',
                userPost: 'Post',
                userEntEmail: 'Company Email',
                userEmpNo: 'EmpNo',
                userAddress: 'Address',
                userDept: 'Department',
                userLeader: 'Leader',
                weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                yesterday: 'yesterday',
                thedaybeforeyesterday: 'the day before yesterday',
                stranger: 'stranger',
                broad: 'broad',
                addToFriends: 'Add to friend',
                addToFrequents: 'Add to frequent',
                removeFriends: 'Remove friend',
                removeFrequents: 'Remove from frequent',
                msgdisturb: 'Message Don\'t disturb',
                noSign: 'No Contents',
                shutUpAction: ' have been banned',
                shutUpWarn: ' have been banned , please try later',
                minutes: 'minutes',
                forever: 'forever',
                shutUpForever: ' have been banned forever',
                cancelShutUp: 'can speak now',
                banned: 'banned',
                loginFail: 'Phone number or password incorrect',
                requestError: 'Request error, please try again later',
                connectServer: 'connecting server...',
                connectSuccess: 'Server connection success',
                connectFail: 'Server connection fail',
                afterSSOSuccess: 'Verify successful , connection to chat server',
                loginSuccess: 'Chat server connection is successful, waiting for initialization',
                sessionExpired: 'Session expired , Please log in again',
                chatServerTimeout: 'Chat server connection timed out, please try again later',
                downApp: 'Download Jingjing',
                companyLogin: 'Company Login',
                appNameWeb: 'Web Jingjing',
                china: 'China',
                taiwan: 'Taiwan',
                usa: 'U.S.A',
                korea: 'Korea',
                russia: 'Russia',
                japan: 'Japan',
                deptLoading: 'Personnel data loading...',
                withDrawMsg: 'withdrew a message',
                withDraw: 'Withdraw',
                canNotWithDraw: 'More than 2 minutes can not be withdrawn',
                privacyAttention: ' not your friends or colleagues, please pay attention to the protection of privacy',
                loadMoreMsg: '更多消息请在聊天记录中查看',
                openRecords: '打开消息记录',
                seeDetail: '查看详情',

                cancelUpload: '传输已取消',
                reupload: '重新上传',
                open: '打开',
                openDir: '打开文件夹',
                fileCacheDay: '文件暂存7天',
                receiverDonwloaded: '对方已接收',
                fileSendFail: '文件发送失败',

                cancelDownload: '取消下载',
                reDownload: '重新下载',
                cancelTrans: '传输已取消',
                downloaded: '接收成功',
                downloadFail: '下载失败',
                transFail: '传输失败',
                saveAs: '另存为',
                fileOutOfDay: '文件已过期',
                allFiles: 'All Files|*.*',
                imageFiles: 'Images|*.png;*.jpg;*.gif',

                setting: 'Setting',
                about: 'About',
                switchAccount: 'Switch Account',
                quit: 'Quit',

                serviceAccount: '服务号',
                fdepts: '常用部门',
                fgroups: '常用群聊 ',
                entCharger: '企业负责人',
                entEmpCount: '企业总人数',

                deptLeader: '部门主管',
                deptDirector: '分管领导',
                deptEmpCount: '部门人数',
                noEmp: '暂无',

                'ent.userName': '姓名',
                'ent.job': '职位',
                'ent.email': '企业邮箱',
                'ent.empNo': '工号',
                'ent.depts': '组织架构',
                'ent.leader': '直接主管',
                'user.userName': '姓名',
                'user.mobile': '电话',
                'user.email': '邮箱',
                'user.noSignature': '这家伙很懒,什么都没有留下...',

                favoriteDept: '添加常用部门',
                favoriteEmp: '添加常用联系人',
                sendInstantMessage: '发送即时消息',
                refreshEnts: '刷新组织架构',

                setUserToFavorite: '添加常用联系人',
                setGroupToFavorite: '添加常用群聊',
                cancelUserToFavorite: '移除常用联系人',
                cancelGroupToFavorite: '移除常用群聊',
                cancelDeptToFavorite: '移除常用部门',

                goback: '<返回',
                broadDetailTitle: '广播详情',

                quitGroup: 'quit group chat',
                chooseUser: '选择群聊成员',

                selectedUsers: '已选择成员：',
                selectedUsersUnit: '人',

                clickToEditEmail: 'click  to edit email',

                account: '账号',
                serviceLogin: '服务号登录',
                autoLogin: '自动登录',
                resetPwd: '重置密码',
                pwdLogin: '密码登录',
                register: '注册',
                smsCode: '验证码',
                wrongSmsCode: '验证码错误',
                blankSmsCode: '请输入验证码',
                diffPassword: '两次输入的密码不一致',
                alreadyInUse: '手机号已经被使用',
                writeInvitationCode: '请填写邀请码',
                finish: '完成',
                next: '下一步',
                skip: '跳过',
                getCode: '获取验证码',
                countDown: '{d}秒后重新获取',
                newPwd: '新密码',
                confirmNewPwd: '再次输入新密码',
                confirmPwd: '确认密码',
                repeatPwd: '再次输入密码',

                safeTipTitle: '安全提示',
                safeTipContentLine1: '公共环境请勿开启自动登录功能，',
                safeTipContentLine2: '以免数据泄露',
                donNotOpen: '不开启',
                confirmOpen: '确认开启',

                forgetPwdTitle: '忘记密码',
                forgetPwdContentLine1: '请通知总管理员，登录管理后台重置',
                forgetPwdContentLine2: '密码http://mgr.jj.snail.com',
                getThat: '我知道了',

                loadEntError: '组织架构加载错误',
                clickToRetry: '点此重新加载',

                'setting.login': '登录',
                'setting.hotkey': '热键',
                'setting.sound': '声音',
                'setting.backup': '聊天备份',
                autoStart: '开机自动启动',
                getMsg: '提取消息',
                showMainIframe: '显示主面板',
                capture: '捕捉屏幕',
                quickSend: '快速发送',
                recordingVoice: '语音按键说话',
                openChatHistory: '打开聊天记录',
                setToDefault: '恢复默认设置',
                sendMsgHotKey: '会话窗口发送消息',
                hasSameHotKey: '冲突',
                CESend: '按Ctrl+Enter键',
                ESend: 'Enter键',
                closeTone: '关闭消息提示音',
                backupToPC: '备份到电脑',
                backupBtn: '备份',
                recoverToPhone: '恢复到手机',
                recoverBtn: '恢复',
                managerBackup: '管理备份',
                managerBackupBtn: '管理',

                close: '关闭',
                scanQrCode: '扫二维码下载手机版',
                copyRight: '苏州蜗牛数字科技股份有限公司©版权所有',

                backupTips: '请在手机上确认，以开始备份',
                restoreTips: '请在手机上确认，以开始还原',
                managerTips: '小提示：修改备份存储目录将会迁移所有已存储的备份，暂不支持中文路径',
                currentBackUpDir: '备份存储位置目录：',
                modify: '更改',
                backupName: '备份名称',
                firstBackupTime: '首次备份时间',
                lastBackupTime: '上次备份时间',
                operate: '操作',
                deleteBackup: '删除备份',

                backupComplete: '备份已完成',
                restoreComplete: '传输已完成，请在手机上继续恢复',
                notCloseApp: '为了保证良好的网络链接，请不要关闭静静办公',
                backuped: '已备份',
                restoreed: '已还原',

                sendFail: '[发送失败]',

                recording: '正在录音...',
                recordFinish: '录音完成',

                noMicroPhone: '未找到麦克风',
                noBroadcaster: '未找到播放设备',

                recentChat: '最近聊天',

                msgTooLong: '内容过长，请删除部分内容后重试',

                shareLink: '分享了一个链接',

                hasBeenShutup: '已被群主禁言，还剩 ',

                largeFileMsg: '[大文件]',
                largeFile: '大文件传输助手',
                largeFilePC: '大文件传输助手(仅局域网PC间)',
                largeFIleMsgTip: '(仅限同一局域网PC端接收)',
                receiveFileTitle: '来自{name}的接收事项',
                stillReceive: '仍然接收',
                hasReject: '已拒绝',
                waitReceive: '等待接收',
                receiveError: '接收中断',
                dragFileTips: '拖拽文件（文件夹）到此或者点击添加按钮',
                deleteFile: '删除',

                messageManager: '消息管理器',
                contacts: '联系人',
                addressBook: '通讯录',
                content: '内容',
                searchRange: '查找范围',

                all: '全部',
                recentOneMonth: '最近一个月',
                recentThreeMonth: '最近三个月',
                recentOneYear: '最近一年',

                text: '查看文本',
                file: '查看文件',

                remark: '备注',
                notSupportSendFileDir: '对不起，暂时不支持发送文件夹。请使用大文件传送功能发送文件夹。',

                fileMsgHistory: '文件[{name}]，请在聊天窗口查看',
                allResult: '全部结果',

                imgView: '图片查看器',
                sourceSize: '实际尺寸',
                optimumSize: '最佳比例',
                zoomout: '放大',
                zoomin: '缩小',
                prevImg: '上一张',
                nextImg: '下一张',
                rotateAntiWise: '逆时针旋转90度',
                rotateWise: '顺时针旋转90度',
                saveImg: '保存',
                saveSuccess: '保存成功',
                imageLoadFail: '无法加载图片',
                lastImg: '已经是最后一张图片',
                firstImg: '已经是第一张图片',

                loadingMsg: '消息加载中',

                receiveStatus: '查看接收状态',
                receive: '接收',
                reject: '拒绝',
                cancelReceive: '取消接收',
                reReceive: '重新接收',
                stillReceive: '仍然接收',
                hasReject: '已拒绝',
                waitReceive: '等待接收',
                receiveError: '接收中断',
                receiveComplete: '已接收',
                intranetPicTips: '当前为内网环境，该图仅限内网用户查看',
                senderCancel: '发送方取消发送',
                cancelLargeFile: '取消发送',
                receiveCancel: '对方取消接收',
                cancelLargeFileMsgInSender: '您已取消发送大文件',
                cancelLargeFileMsgInReceiver: '已取消发送大文件',
                fileTransfering: '有文件正在传输，确定要退出？',

                unreadMsg: '条未读消息',
                newMsg: '条新消息',

                'btn.face': '插入表情',
                'btn.file': '发送文件',
                'btn.img': '插入图片',
                'btn.voice': '开始录音',
                'btn.capture': '截图',
                'btn.history': '消息记录',

                offlineTip: '静静已离线，请检查网络',
                paste: '粘贴',

                minwin: '最小化',
                restorewin: '向下还原',
                maxwin: '最大化',

                error107: '文件不存在',
                error108: '文件夹不存在',
                error8: '无法开启文件发送端口，请检查网络或防火墙设置',
                loginError2: '用户名或密码错误',
                loginError12: '用户名或密码错误',
                loginError10: '网络异常',
                loginError15: '您的账号已登录，无法重复登录。',
                loginError16: '请输入正确的验证码',
                loginError100: '用户不存在',
                noStaffs: '所选部门没有员工，无法创建群聊',
                saveImgPifx: '静静图片',
                leaveGroupConfirm: '是否确认退出该群？',
                imageWasWithDrawBySender: '图片已被撤回',
                noMessage: '没有聊天记录',
                noSearchMsg: '没有搜索到相关消息',
                outOfToken: '身份已过期，请重新登录。',
                clear: '清屏',
                cut: 'cut',
                deleteContent: 'delete',
                fileTooLarge: '文件大小超过80M，请使用大文件传输助手发送',
                tooLargeFile: '存在超过80M的文件无法发送，请使用大文件传输助手发送'
            }
        }
        var langs = [];
        for (var p in LANGMAP) {
            langs.push({
                langName: LANGMAP[p].langName,
                langValue: p
            });
        }
        var obj = {
            langs: langs,
            setLang: function (_lang) {
                utils.setLs('lang', _lang);
                // lang = _lang;
            },
            getLang: function () {
                // if(lang) return lang;
                return utils.getLs('lang') || 'cn';
            },
            getKey: function (key, returnBlank) {
                var _l = this.getLang();
                if (LANGMAP[_l] && LANGMAP[_l][key] !== undefined) {
                    return LANGMAP[_l][key];
                }
                return !returnBlank ? key : '';
            },
            isSeted: function () {
                if (!(utils.getLs('lang'))) return false;
                return true;
            }
        }
        return obj;
    },
    webConfig: {
        user: {},
        setUser: function (_user) {
            if (_user.STicket) {
                token = _user.STicket;
            }
            if (!_user.STicket && token) {
                _user.STicket = token;
            }
            this.user.SUserId = _user.Id;
            this.user = _user;
        },
        
        // 消息类型
        MSG_TEXT_TYPE: 'text',
        MSG_VOICE_TYPE: 'voice',
        MSG_VIDEO_TYPE: 'video',
        MSG_SYSTEM_TYPE: 'system',
        MSG_FILE_TYPE: 'file',
        MSG_PIC_TYPE: 'image',
        MSG_NEWS_TYPE: 'news',
        MSG_METTING_TYPE: 'metting',
        MSG_HTML_TYPE: 'html',
        MSG_READMSG_TYPE: 'readmsg',
        MSG_CLEAR_TYPE: 'clear',
        MSG_SERVICE_TYPE: 'service',
        MSG_NAME: 'msg',
        // 多媒体消息是否在播放
        MSG_ISPLAYING: false, 
        getUser: function (userId) {
            this.user = { 
                "Avatar": require("../../src/assets/images/user_D.png"),
                "Gender": 0, "Mobile": "+8617749721923", "Email": "", "Status": 0, "Address": "", "Birthday": "", "Signature": "", "NickName": null, "PrivacyType": 0, "Staffs": [{ "No": "WN9799", "UserId": "f43245bd9824430b973fbf57320bb38b", "Company": { "Owner": null, "Id": "ff808081581b3e2801581b47dd4e0000", "Name": "蜗牛游戏" }, "Type": 0, "Leader": { "No": "WN2557", "UserId": "1130b4ea7eb74fd5b5b1f23994925ef5", "Company": { "Owner": null, "Id": "ff808081581b3e2801581b47dd4e0000", "Name": "蜗牛游戏" }, "Type": 0, "Leader": { "No": "WN3891", "UserId": "82d6cfb16c274461a59518d2b358346e", "Company": null, "Type": 0, "Leader": null, "JobTitle": "运维总监", "Email": "zhaoym@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": null, "ExtendProps": [{ "Key": "星级", "Value": "★★★☆" }, { "Key": "工作地点", "Value": "171" }], "ExtendPropsAfterName": ["★★★☆"], "Id": "82d6cfb16c274461a59518d2b35834", "Name": "赵亚明" }, "JobTitle": "IT高级经理", "Email": "lvxl@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": null, "ExtendProps": [{ "Key": "星级", "Value": "★★" }], "ExtendPropsAfterName": ["★★"], "Id": "1130b4ea7eb74fd5b5b1f23994925e", "Name": "吕小龙" }, "JobTitle": "WEB前端", "Email": "xingxin@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": [{ "Leader": null, "Director": null, "LevelInfo": "蜗牛公司\\蜗牛游戏\\管理架构\\管理\\IT中心\\静静办公", "AllStaffCount": null, "Children": null, "Staffs": null, "CompanyId": "ff808081581b3e2801581b47dd4e0000", "IsMain": 1, "Id": "1d5792a38bf64834b12b70c9f8e7d92a", "Name": "静静办公" }], "ExtendProps": [{ "Key": "星级", "Value": "" }, { "Key": "工作地点", "Value": "" }], "ExtendPropsAfterName": null, "Id": "f43245bd9824430b973fbf57320bb3", "Name": "邢鑫" }, { "No": "", "UserId": "f43245bd9824430b973fbf57320bb38b", "Company": { "Owner": null, "Id": "ff80808178f8a3550179f8da50b000bf", "Name": "abc" }, "Type": 0, "Leader": null, "JobTitle": "", "Email": "", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": [{ "Leader": null, "Director": null, "LevelInfo": "abc", "AllStaffCount": null, "Children": null, "Staffs": null, "CompanyId": "ff80808178f8a3550179f8da50b000bf", "IsMain": 1, "Id": "ff80808178f8a3550179f8da50d800c3", "Name": "abc" }], "ExtendProps": null, "ExtendPropsAfterName": null, "Id": "ff80808178f8a3550179f8da50b800c0", "Name": "邢鑫" }], "Privacy": null, "AvatarMD5": "", "Favorite": 0, "BannedTimeLeft": 0, "IMStatus": 1, "Token": "TGT-2142-zjPJRfFUuewh7nZt0hEMdaCSKhDGa1aj4joes12AKoDMcDDkqn-oa.sso.woniu.com", "Password": null, "Code": null, "AutoLogin": true, "ValidateCodeId": null, "ValidateCode": null, "InvitationCode": null, "Type": 0, "Id": "f43245bd9824430b973fbf57320bb38b", "Name": "邢鑫" };
            return this.user;
        },
    },
    chatService: {
        getChats(page, pageSize, callback) {
            let that = this;
            let chatList = [
                // { "Type": 1002, "MsgContent": "[图片]", "MsgType": 4, "MsgStatus": 1, "MsgTimestamp": 1654133988256, "UnreadMsgCount": 1, "ReadTimestamp": 1654062602335, "Sticky": 0, "Undisturbed": 0, "MsgSenderId": "d6de88cdd0be414ba9b4c44269c4de25", "MsgSenderName": "严辉昊", "AtMeTimestamp": 0, "IsEncryption": 0, "Avatar": require("../../src/assets/images/women.png"), "Favorite": 0, "MemberCount": 12, "IMStatus": 1, "Id": "group_1130b4ea7eb74fd5b5b1f23994925ef5_1615253903620", "Name": "静静办公开发组", "isGroup": true, "ActiveTimestamp": 1654133986842, "id": "group_1130b4ea7eb74fd5b5b1f23994925ef5_1615253903620", "index": 0, "_h": 64, "_offsetTop": 0, "_senderName": "严辉昊", "LastMsgId": "d6de88cdd0be414ba9b4c44269c4de25_1654133987660", "firstUnReadId": "d6de88cdd0be414ba9b4c44269c4de25_1654133987660" },
                {
                    ActiveTimestamp: 1655360696444,
                    AtMeTimestamp: 0,
                    Avatar: require("../../src/assets/images/user_E.png"),
                    Favorite: 0,
                    IMStatus: 1,
                    Id: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
                    IsEncryption: 0,
                    MemberCount: 5,
                    MsgContent: "[微笑]测试消息",
                    MsgSenderId: "8f31027c967d4bdfaca19d2146e8aedf",
                    MsgSenderName: "朱瑜骏",
                    MsgStatus: 1,
                    MsgTimestamp: 1655360696444,
                    MsgType: 0,
                    Name: "吕小龙,朱瑜骏,梅虎,何佳玏,邢鑫",
                    ReadTimestamp: 1655360696444,
                    Sticky: 0,
                    Type: 1002,
                    Undisturbed: 0,
                    UnreadMsgCount: 100,
                    id: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
                    index: 0,
                    isGroup: true,
                    _h: 64,
                    _offsetTop: 0,
                }, {
                    ActiveTimestamp: 1654050044124,
                    AtMeTimestamp: 0,
                    Avatar: require("../../src/assets/images/user_B.png"),
                    Favorite: 1,
                    IMStatus: 1,
                    Id: "5bfcdc99aa55498aa1c5da6be672c136",
                    IsEncryption: 0,
                    MemberCount: 1,
                    MsgContent: "2[苦笑][微笑][微笑][微笑][微笑][微笑][微笑]",
                    MsgSenderId: "f43245bd9824430b973fbf57320bb38b",
                    MsgSenderName: "邢鑫",
                    MsgStatus: 1,
                    MsgTimestamp: 1654050044124,
                    MsgType: 0,
                    Name: "张三",
                    ReadTimestamp: 1654050044124,
                    Sticky: 0,
                    Type: 1000,
                    Undisturbed: 0,
                    UnreadMsgCount: 99,
                    id: "5bfcdc99aa55498aa1c5da6be672c136",
                    index: 0,
                    isGroup: false,
                    _h: 64,
                    _offsetTop: 0,
                },
                // { "Type": 1002, "MsgContent": "{\"multiplayer\":true,\"chatRoomId\":\"group_5bfcdc99aa55498aa1c5da6be672c136_1636694918551\",\"message\":\"视频会议邀请\",\"n_TYPE\":10,\"voiceMeetingType\":\"invite\",\"voiceRoomKey\":\"f93560de-5134-8a55-8c95-1e1684f3ce58\"}", "MsgType": 10, "MsgStatus": 1, "MsgTimestamp": 1653873696662, "UnreadMsgCount": 0, "ReadTimestamp": 1653873696662, "Sticky": 0, "Undisturbed": 0, "MsgSenderId": "f43245bd9824430b973fbf57320bb38b", "MsgSenderName": "邢鑫", "AtMeTimestamp": 0, "IsEncryption": 0, "Avatar": require("../../src/assets/images/women.png"), "Favorite": 0, "MemberCount": 10, "IMStatus": 1, "Id": "group_5bfcdc99aa55498aa1c5da6be672c136_1636694918551", "Name": "吕小龙,马晶晶,佩恩,carl,123,黄夏宇,yhh,严辉昊,谢九龙,邢鑫", "isGroup": true, "ActiveTimestamp": 1653873696662, "id": "group_5bfcdc99aa55498aa1c5da6be672c136_1636694918551", "index": 8, "_senderName": "邢鑫", "_h": 64, "_offsetTop": 512 }
            ];
            handlerChatList(chatList);
            this.chatList = handlerChatList(chatList);
            callback && callback(_res);
        },
        chatList: this.chatList,
        getChat(id, notCreate) {
            let that = this;
            for (var i = 0; i < this.chatList.length; i++) {
                if (id == this.chatList[i].Id) {
                    return this.chatList[i];
                }
            }
        },

    },
    concatService: {
        getUserDetail(id) {
            var userList = [
                { "Avatar":require("../../src/assets/images/user_D.png"), "Gender": 0, "Mobile": "+8617749721923", "Email": "", "Status": 0, "Address": "", "Birthday": "", "Signature": "", "NickName": null, "PrivacyType": 0, "Staffs": [{ "No": "WN9799", "UserId": "f43245bd9824430b973fbf57320bb38b", "Company": { "Owner": null, "Id": "ff808081581b3e2801581b47dd4e0000", "Name": "蜗牛游戏" }, "Type": 0, "Leader": { "No": "WN2557", "UserId": "1130b4ea7eb74fd5b5b1f23994925ef5", "Company": { "Owner": null, "Id": "ff808081581b3e2801581b47dd4e0000", "Name": "蜗牛游戏" }, "Type": 0, "Leader": { "No": "WN3891", "UserId": "82d6cfb16c274461a59518d2b358346e", "Company": null, "Type": 0, "Leader": null, "JobTitle": "运维总监", "Email": "zhaoym@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": null, "ExtendProps": [{ "Key": "星级", "Value": "★★★☆" }, { "Key": "工作地点", "Value": "171" }], "ExtendPropsAfterName": ["★★★☆"], "Id": "82d6cfb16c274461a59518d2b35834", "Name": "赵亚明" }, "JobTitle": "IT高级经理", "Email": "lvxl@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": null, "ExtendProps": [{ "Key": "星级", "Value": "★★" }], "ExtendPropsAfterName": ["★★"], "Id": "1130b4ea7eb74fd5b5b1f23994925e", "Name": "吕小龙" }, "JobTitle": "WEB前端", "Email": "xingxin@mysnail.com", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": [{ "Leader": null, "Director": null, "LevelInfo": "蜗牛公司\\蜗牛游戏\\管理架构\\管理\\IT中心\\静静办公", "AllStaffCount": null, "Children": null, "Staffs": null, "CompanyId": "ff808081581b3e2801581b47dd4e0000", "IsMain": 1, "Id": "1d5792a38bf64834b12b70c9f8e7d92a", "Name": "静静办公" }], "ExtendProps": [{ "Key": "星级", "Value": "" }, { "Key": "工作地点", "Value": "" }], "ExtendPropsAfterName": null, "Id": "f43245bd9824430b973fbf57320bb3", "Name": "邢鑫" }, { "No": "", "UserId": "f43245bd9824430b973fbf57320bb38b", "Company": { "Owner": null, "Id": "ff80808178f8a3550179f8da50b000bf", "Name": "abc" }, "Type": 0, "Leader": null, "JobTitle": "", "Email": "", "ExtNo": "", "Status": 0, "Avatar": null, "IMStatus": 1, "Departments": [{ "Leader": null, "Director": null, "LevelInfo": "abc", "AllStaffCount": null, "Children": null, "Staffs": null, "CompanyId": "ff80808178f8a3550179f8da50b000bf", "IsMain": 1, "Id": "ff80808178f8a3550179f8da50d800c3", "Name": "abc" }], "ExtendProps": null, "ExtendPropsAfterName": null, "Id": "ff80808178f8a3550179f8da50b800c0", "Name": "邢鑫" }], "Privacy": null, "AvatarMD5": "", "Favorite": 0, "BannedTimeLeft": 0, "IMStatus": 1, "Token": "TGT-2142-zjPJRfFUuewh7nZt0hEMdaCSKhDGa1aj4joes12AKoDMcDDkqn-oa.sso.woniu.com", "Password": null, "Code": null, "AutoLogin": true, "ValidateCodeId": null, "ValidateCode": null, "InvitationCode": null, "Type": 0, "Id": "f43245bd9824430b973fbf57320bb38b", "Name": "邢鑫" },
                {
                    Address: "",
                    AutoLogin: false,
                    Avatar:require("../../src/assets/images/user_B.png"),
                    AvatarMD5: "",
                    BannedTimeLeft: 0,
                    Birthday: "",
                    Code: null,
                    Email: "",
                    Favorite: 1,
                    Gender: 0,
                    IMStatus: 1,
                    Id: "5bfcdc99aa55498aa1c5da6be672c136",
                    InvitationCode: null,
                    Mobile: "+8613962524322",
                    Name: "张三",
                    NickName: null,
                    Password: null,
                    Privacy: [{
                        CompanyId: "ff8080816b4fb4ae016b69eb16410022",
                        CompanyName: "Snail Games USA",
                        CompanyPrivacy: 0,
                        Id: null,
                        JobTitle: "",
                        JobTitlePrivacy: 0,
                        Name: null,
                        Status: 1,
                        UserId: "5bfcdc99aa55498aa1c5da6be672c136",
                    },
                    {
                        CompanyId: "ff8080816b4fb4ae017186118687041b",
                        CompanyName: "IndiEV",
                        CompanyPrivacy: 1,
                        Id: null,
                        JobTitle: "",
                        JobTitlePrivacy: 1,
                        Name: null,
                        Status: 0,
                        UserId: "5bfcdc99aa55498aa1c5da6be672c136",
                    },
                    ],
                    PrivacyType: 0,
                    Signature: "",
                    Staffs: [],
                    Status: 0,
                    Token: null,
                    Type: 0,
                    ValidateCode: null,
                    ValidateCodeId: null,
                },
                {
                    Address: "",
                    AutoLogin: false,
                    Avatar: require("../../src/assets/images/user_L.png"),
                    AvatarMD5: "2742ebf902cd08ce2844c075eb7dab0c",
                    BannedTimeLeft: 0,
                    Birthday: "",
                    Code: null,
                    Email: "",
                    Favorite: 0,
                    Gender: 0,
                    IMStatus: 1,
                    Id: "1130b4ea7eb74fd5b5b1f23994925ef5",
                    InvitationCode: null,
                    Mobile: "+8617095012304",
                    Name: "吕小龙",
                    NickName: null,
                    Password: null,
                    Privacy: [],
                    PrivacyType: 0,
                    Signature: "",
                    Staffs: [],
                    Status: 0,
                    Token: null,
                    Type: 0,
                    ValidateCode: null,
                    ValidateCodeId: null,
                },
                {"Avatar": require("../../src/assets/images/user_F.png"),"Gender":0,"Mobile":"+8617090832047","Email":"","Status":0,"Address":"","Birthday":"","Signature":"","NickName":null,"PrivacyType":0,"Staffs":[{"No":"WN4899","UserId":"8f31027c967d4bdfaca19d2146e8aedf","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN3891","UserId":"82d6cfb16c274461a59518d2b358346e","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN0001","UserId":"0c2a2e336456490fb68596729c16c782","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN0001","UserId":"0c2a2e336456490fb68596729c16c782","Company":null,"Type":0,"Leader":null,"JobTitle":"总裁","Email":"shihai@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★★★"}],"ExtendPropsAfterName":["★★★★★"],"Id":"0c2a2e336456490fb68596729c16c7","Name":"石海"},"JobTitle":"总裁","Email":"shihai@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★★★"}],"ExtendPropsAfterName":["★★★★★"],"Id":"0c2a2e336456490fb68596729c16c7","Name":"石海"},"JobTitle":"运维总监","Email":"zhaoym@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★☆"},{"Key":"工作地点","Value":"171"}],"ExtendPropsAfterName":["★★★☆"],"Id":"82d6cfb16c274461a59518d2b35834","Name":"赵亚明"},"JobTitle":"高级产品经理","Email":"zhuyj@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":[{"Leader":null,"Director":null,"LevelInfo":"蜗牛公司\\蜗牛游戏\\管理架构\\管理\\IT中心\\APP开发组\\终端","AllStaffCount":null,"Children":null,"Staffs":null,"CompanyId":"ff808081581b3e2801581b47dd4e0000","IsMain":1,"Id":"4e36d07a28d543d1ad420905069a88b3","Name":"终端"}],"ExtendProps":[{"Key":"星级","Value":"★★"},{"Key":"工作地点","Value":"171"}],"ExtendPropsAfterName":["★★"],"Id":"8f31027c967d4bdfaca19d2146e8ae","Name":"朱瑜骏"}],"Privacy":[{"UserId":"8f31027c967d4bdfaca19d2146e8aedf","CompanyId":"ff808081581b3e2801581b47dd4e0000","CompanyName":"蜗牛游戏","JobTitle":"高级产品经理","CompanyPrivacy":0,"JobTitlePrivacy":1,"Status":0,"Id":null,"Name":null}],"AvatarMD5":"101fd1ad3f075dd1a74544c3e53303dd","Favorite":0,"BannedTimeLeft":0,"IMStatus":1,"Token":null,"Password":null,"Code":null,"AutoLogin":false,"ValidateCodeId":null,"ValidateCode":null,"InvitationCode":null,"Type":0,"Id":"8f31027c967d4bdfaca19d2146e8aedf","Name":"朱瑜骏"},
               
                {
                    Address: "",
                    AutoLogin: false,
                    Avatar: require("D:/JJPC/img/HeadImg/man.png"),
                    AvatarMD5: "",
                    BannedTimeLeft: 0,
                    Birthday: "",
                    Code: null,
                    Email: "",
                    Favorite: 0,
                    Gender: 0,
                    IMStatus: 1,
                    Id: "cc8dd0a740a441309328adeac211f1ed",
                    InvitationCode: null,
                    Mobile: "+8617095071862",
                    Name: "梅虎",
                    NickName: null,
                    Password: null,
                    Privacy: [],
                    PrivacyType: 0,
                    Signature: "",
                    Staffs: [],
                    Status: 0,
                    Token: null,
                    Type: 0,
                    ValidateCode: null,
                    ValidateCodeId: null,
                },
                {"Avatar":require("../../src/assets/images/user_K.png"),"Gender":0,"Mobile":"+8617095012163","Email":"","Status":0,"Address":"","Birthday":"","Signature":"","NickName":null,"PrivacyType":0,"Staffs":[{"No":"WN4885","UserId":"d2c28119863f4a2f8bdd2f0dc393f3f4","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN3891","UserId":"82d6cfb16c274461a59518d2b358346e","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN0001","UserId":"0c2a2e336456490fb68596729c16c782","Company":{"Owner":null,"Id":"ff808081581b3e2801581b47dd4e0000","Name":"蜗牛游戏"},"Type":0,"Leader":{"No":"WN0001","UserId":"0c2a2e336456490fb68596729c16c782","Company":null,"Type":0,"Leader":null,"JobTitle":"总裁","Email":"shihai@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★★★"}],"ExtendPropsAfterName":["★★★★★"],"Id":"0c2a2e336456490fb68596729c16c7","Name":"石海"},"JobTitle":"总裁","Email":"shihai@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★★★"}],"ExtendPropsAfterName":["★★★★★"],"Id":"0c2a2e336456490fb68596729c16c7","Name":"石海"},"JobTitle":"运维总监","Email":"zhaoym@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":null,"ExtendProps":[{"Key":"星级","Value":"★★★☆"},{"Key":"工作地点","Value":"171"}],"ExtendPropsAfterName":["★★★☆"],"Id":"82d6cfb16c274461a59518d2b35834","Name":"赵亚明"},"JobTitle":"产品经理-免商店/免拨","Email":"hejl@mysnail.com","ExtNo":"","Status":0,"Avatar":null,"IMStatus":1,"Departments":[{"Leader":null,"Director":null,"LevelInfo":"蜗牛公司\\蜗牛游戏\\管理架构\\管理\\IT中心\\APP开发组\\免商店","AllStaffCount":null,"Children":null,"Staffs":null,"CompanyId":"ff808081581b3e2801581b47dd4e0000","IsMain":1,"Id":"7e7a342656b04ff9ae51e2d3edf25f07","Name":"免商店"}],"ExtendProps":[{"Key":"星级","Value":"★☆"},{"Key":"工作地点","Value":"171"}],"ExtendPropsAfterName":["★☆"],"Id":"d2c28119863f4a2f8bdd2f0dc393f3","Name":"何佳玏"}],"Privacy":[{"UserId":"d2c28119863f4a2f8bdd2f0dc393f3f4","CompanyId":"ff808081581b3e2801581b47dd4e0000","CompanyName":"蜗牛游戏","JobTitle":"产品经理-免商店/免拨","CompanyPrivacy":0,"JobTitlePrivacy":0,"Status":0,"Id":null,"Name":null}],"AvatarMD5":"","Favorite":0,"BannedTimeLeft":0,"IMStatus":1,"Token":null,"Password":null,"Code":null,"AutoLogin":false,"ValidateCodeId":null,"ValidateCode":null,"InvitationCode":null,"Type":0,"Id":"d2c28119863f4a2f8bdd2f0dc393f3f4","Name":"何佳玏"},
               
                {
                    Avatar:require("../../src/assets/images/user_E.png"),
                    Id: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
                    MemberCount: 5,
                    Members: [
                        {
                            Address: "",
                            AutoLogin: false,
                            Avatar: require("../../src/assets/images/user_L.png"),
                            AvatarMD5: "2742ebf902cd08ce2844c075eb7dab0c",
                            BannedTimeLeft: 0,
                            Birthday: "",
                            Code: null,
                            Email: "",
                            Favorite: 0,
                            Gender: 0,
                            IMStatus: 1,
                            Id: "1130b4ea7eb74fd5b5b1f23994925ef5",
                            InvitationCode: null,
                            Mobile: "+8617095012304",
                            Name: "吕小龙",
                            NickName: null,
                            Password: null,
                            Privacy: [],
                            PrivacyType: 0,
                            Signature: "",
                            Staffs: [],
                            Status: 0,
                            Token: null,
                            Type: 0,
                            ValidateCode: null,
                            ValidateCodeId: null,
                        },
                        {
                            Address: "",
                            AutoLogin: false,
                            Avatar: require("../../src/assets/images/user_F.png"),
                            AvatarMD5: "101fd1ad3f075dd1a74544c3e53303dd",
                            BannedTimeLeft: 0,
                            Birthday: "",
                            Code: null,
                            Email: "",
                            Favorite: 0,
                            Gender: 0,
                            IMStatus: 1,
                            Id: "8f31027c967d4bdfaca19d2146e8aedf",
                            InvitationCode: null,
                            Mobile: "+8617090832047",
                            Name: "朱瑜骏",
                            NickName: null,
                            Password: null,
                            Privacy: [],
                            PrivacyType: 0,
                            Signature: "",
                            Staffs: [],
                            Status: 0,
                            Token: null,
                            Type: 0,
                            ValidateCode: null,
                            ValidateCodeId: null,
                        },
                        {
                            Address: "",
                            AutoLogin: false,
                            Avatar: require("D:/JJPC/img/HeadImg/man.png"),
                            AvatarMD5: "",
                            BannedTimeLeft: 0,
                            Birthday: "",
                            Code: null,
                            Email: "",
                            Favorite: 0,
                            Gender: 0,
                            IMStatus: 1,
                            Id: "cc8dd0a740a441309328adeac211f1ed",
                            InvitationCode: null,
                            Mobile: "+8617095071862",
                            Name: "梅虎",
                            NickName: null,
                            Password: null,
                            Privacy: [],
                            PrivacyType: 0,
                            Signature: "",
                            Staffs: [],
                            Status: 0,
                            Token: null,
                            Type: 0,
                            ValidateCode: null,
                            ValidateCodeId: null,
                        },
                        {
                            Address: "",
                            AutoLogin: false,
                            Avatar:require("../../src/assets/images/user_K.png"),
                            AvatarMD5: '',
                            BannedTimeLeft: 0,
                            Birthday: "",
                            Code: null,
                            Email: "",
                            Favorite: 0,
                            Gender: 0,
                            IMStatus: 1,
                            Id: "d2c28119863f4a2f8bdd2f0dc393f3f4",
                            InvitationCode: null,
                            Mobile: "+8617095012163",
                            Name: "何佳玏",
                            NickName: null,
                            Password: null,
                            Privacy: [],
                            PrivacyType: 0,
                            Signature: "",
                            Staffs: [],
                            Status: 0,
                            Token: null,
                            Type: 0,
                            ValidateCode: null,
                            ValidateCodeId: null,
                        },
                        {
                            Address: "",
                            AutoLogin: false,
                            Avatar: require("../../src/assets/images/user_D.png"),
                            AvatarMD5: "",
                            BannedTimeLeft: 0,
                            Birthday: "",
                            Code: null,
                            Email: "",
                            Favorite: 0,
                            Gender: 0,
                            IMStatus: 1,
                            Id: "f43245bd9824430b973fbf57320bb38b",
                            InvitationCode: null,
                            Mobile: "+8617749721923",
                            Name: "邢鑫",
                            NickName: null,
                            Password: null,
                            Privacy: [],
                            PrivacyType: 0,
                            Signature: "",
                            Staffs: [],
                            Status: 0,
                            Token: null,
                            Type: 0,
                            ValidateCode: null,
                            ValidateCodeId: null,
                        },
                    ],
                    Name: "",
                    OperatorId: "f43245bd9824430b973fbf57320bb38b",
                    OwnerId: "d2c28119863f4a2f8bdd2f0dc393f3f4",
                    SDKAction: 22,
                    SDKContent: "未找到对应值",
                    ShowName: "吕小龙,朱瑜骏,梅虎,何佳玏,邢鑫",
                },
            ];
            var info = null;
            for (let i in userList) {
                if (userList[i].Id == id) {
                    info = userList[i];
                    break;
                }
            };
            console.log(info)
            return info;
        },
    },
    convertMsg(content) {
        var _content = content;
        var reg = /<br[^>]*\/*>/g, nbsp = /&nbsp;/g;
        _content = _content.replace(reg, '\n');
        _content = _content.replace(nbsp, ' ');
        _content = _content.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g, '');//去除 a 标签
        _content = utils.emojiImgToUnicode(_content);
        _content = this.faceToFont(_content);
        _content = this.htmlEncode(_content);
        _content = this.htmlDecode(_content);
        //@人转换
        // _content = utils.convertAtToMob(_content, empService.getEmpInfo, empService.getEmpName);
        _content = utils.convertAtToMob(_content);
        // message.setContent(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(_content)));
        return _content;
    },
    createMessage: (() => {
        var sending = {};
        let that = this;
        return function (chatId, msgType, content, file, onlineFiles) {
            var user = this.webConfig.getUser();
            var chat = this.chatService.getChat(chatId);
            // 视频会议 - 新增逻辑 删除左侧栏和联系人的对话框 调用getChat函数获取不到联系人的个人信息返回 undefined 重新调用接口 获取联系人的个人信息
            if (chat == undefined) {
                // 获取 - 视频会议 内存入的 联系人的个人信息
                chat = getChatIdObj.getData();
                chat.isGroup = chat.Type == 1002 ? true : false;
                // 调用接口 如使用 async/await 等待异步 返回的对象为 Promise 需要多处修改的老代码取值方式
                //  await new Promise((resolve) => {
                //     callCefMethod('user/getAllInfoById', {
                //         userId: chatId,
                //     }, function (res) {
                //         if (res.Code == 0) {
                //             res.Data.isGroup = res.Data.Type == 1002 ? true : false;
                //             chat = res.Data;
                //             resolve();
                //         }
                //     })

                // })

            }
            // 视频会议 特殊处理
            // if(msgType == 10 && JSON.parse(content) && JSON.parse(content).chatRoomId.indexOf('group_') >= 0){
            //     chat = chatService.getChat(JSON.parse(content).chatRoomId) ;
            console.log(chat);
            var now = new Date().getTime();
            var messageId = [user.Id, now].join('_');
            while (sending[messageId]) {
                now = new Date().getTime();
                messageId = [user.Id, now].join('_');
            }
            var msg = {
                id: messageId,
                chatId: chatId,
                chatType: !chat.isGroup ? 1000 : 1002,
                type: msgType,
                content: content,
                senderId: user.Id,
                filePath: file ? file.Path : '',
                timeStamp: now,
                fileLength: file ? file.Size : 0,
                fileUrl: file ? (file.FileUrl || '') : ''
            };
            var fileStart = /file:\/\/\//;
            msg.SendMode = 0;
            if (onlineFiles) {
                var arr = [];
                var msgContent = {};
                msgContent.totalLength = 0;
                msgContent.n_TYPE = 9;
                msgContent.type = 0;
                for (var i = 0; i < onlineFiles.length; i++) {
                    var temp = {};
                    onlineFiles[i].Path = onlineFiles[i].Path.replace(fileStart, '');
                    temp.Path = onlineFiles[i].Path;
                    temp.Size = onlineFiles[i].Size;
                    temp.IsDirectory = onlineFiles[i].IsDirectory;
                    msgContent.totalLength += onlineFiles[i].Size;
                    arr.push(temp);
                }
                msgContent.fileList = arr;
                msg.onlineFiles = arr;
                msg.content = angular.toJson(msgContent);
                msg.SendMode = 1;
            }
            msg.filePath = msg.filePath.replace(fileStart, '');
            sending[messageId] = 1;
            setTimeout(function () {
                delete sending[messageId];
            }, 20000);
            return {
                msg: msg,
                now: now
            };


        }
    })(),
    emojiFaceReplace(str) {
        if (!str) return str;
        var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
        str = str.replace(patt, function (_char) {
            var H, L, code;
            if (_char.length === 2) {
                H = _char.charCodeAt(0);
                // 取出高位
                L = _char.charCodeAt(1);
                // 取出低位
                code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
                // 转换算法
                code = code.toString(16).toLowerCase();
                if (emojiFaceMap[code]) {
                    // require 引入图片路径 否则vue 编译找不到路径
                    let url = require("../../src/assets/images/emoji/'" + code + ".png");
                    // console.log(url)
                    return '<img src="' + url + '" title1="[emoji_' + emojiFaceMap[code].title + ']" class="emoji_face"/>';
                    // return '<img src="../../src/assets/images/emoji/' + code + '.png" title1="[emoji_' + emojiFaceMap[code].title + ']" class="emoji_face"/>';
                } else {
                    return '';
                }
            } else {
                return _char;
            }
        })
        var patt2 = /[\u0000-\uffff]/g;
        str = str.replace(patt2, function (_char) {
            var code;
            if (_char.length === 1) {
                code = _char.charCodeAt(0).toString(16).toLowerCase();;
                if (emojiFaceMap[code]) {
                    // require 引入图片路径 否则vue 编译找不到路径
                    let url = require("../../src/assets/images/emoji/'" + code + ".png");
                    return '<img isface="1" src="' + url + '" title1="[emoji_' + emojiFaceMap[code].title + ']" class="emoji_face"/>';
                } else {
                    return _char;
                }
            } else {
                return _char;
            }
        })
        return str;
    },
    faceToFont(html) {
        var reg1 = /<img[^>]+(title="(\[[^>]+\])")[^>]*\/*>/gi;
        var reg2 = /<img[^>]+(title1="(\[[^>]+\])")[^>]*\/*>/gi;
        html = html.replace(reg1, function (v1, v2, v3) {
            return v3;
        })
        html = html.replace(reg2, function (v1, v2, v3) {
            return v3;
        })
        return html
    },
    htmlEncode(e) {
        return utils.isString(e) ? e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
    },
    htmlDecode(e) {
        return e && 0 != e.length ? e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : ""
    },

    faces() {
        // var woniuTitles = [
        // '可爱','惊喜','满足','愉快','微笑','开心','傻笑','狂笑','偷笑','坏笑',
        // '奸笑','色'   ,'使坏','逗逼','认真','勇气','呆萌','发傻','呐尼','发呆',
        // '嘟嘴','好吃','斜视','纠结','晕'   ,'木'   ,'苦笑','无奈','尴尬','流汗',
        // '低落','烦躁','无辜','撇嘴','左哼哼','右哼哼','惊讶','惊恐','伤心','感动',
        // '哽咽','哭'   ,'生气','发怒','噗'   ,'烦'   ,'怂'   ,'赞'
        // ];
        // var qqTitles = ["微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","龇牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","愉快","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","悠闲","奋斗","咒骂","疑问","嘘","晕","疯了","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","嘴唇","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK"];
        var qqTitles = ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "大笑", "惊讶", "难过", "囧", "抓狂", "吐", "偷笑", "愉快", "吐舌", "傲慢", "困", "惊恐", "流汗", "悠闲", "奋斗", "咒骂", "恶魔", "邪恶", "外星人", "僵尸", "机器人", "大便", "疑问", "嘘", "晕", "衰", "骷髅", "打击", "再见", "抠鼻", "鼓掌", "坏笑", "哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "怪物", "幽灵", "感冒", "苦笑", "瞪眼", "尖叫", "遗憾", "斜眼", "嘿哈", "捂脸", "奸笑", "眨眼", "机智", "皱眉", "耶", "菜刀", "西瓜", "啤酒", "咖啡", "猪头", "玫瑰", "凋谢", "嘴唇", "爱心", "心碎", "蛋糕", "炸弹", "晚安", "太阳", "抱抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "OK", "不对", "双手合十", "加油", "庆祝", "礼物", "茶", "红包", "蜡烛"];
        var titles = {
            qq: qqTitles
            // woniu : woniuTitles
        }
        var titlesArr = [];
        var cates = [];
        var maps = {};
        for (var p in titles) {
            cates.push(p);
            titlesArr.push(titles[p]);
            !maps[p] && (maps[p] = {});
            for (var i = 0; i < titles[p].length; i++) {
                maps[p][titles[p][i]] = i;
            }
        }
        return {
            cates: cates,
            titles: titlesArr,
            maps: maps
        }
    },
    metaReg: '',
    replaceMetaStr(str) {
      var metaArr = ['\\', '?', '*', '^', '$', '+', '(', ')', '{', '}', '[', ']', '.'];
      for (var i = 0; i < metaArr.length; i++) {
        metaArr[i] = '\\' + metaArr[i];
      }
      var metaReg = new RegExp('(' + metaArr.join('|') + ')', 'g');
      this.metaReg = metaReg;
      str = str.replace(metaReg, function (v) {
        return '\\' + v;
      });
      return str;
    },
    hrefEncode(str) {
        var linkReg = "(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#!?(&|&amp;)//=]*)";
        linkReg = new RegExp(linkReg, 'gi');
        var ipReg = /(http(s)?:\/\/.)?((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))(?:\:\d{1-5})?[-_.%~!*';:@&=+$,/?#\[\]a-zA-Z0-9]*/g;
        // var ipReg = /(http(s)?:\/\/.)?((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))(?:\:\d{1-5})?[^()\s\u4e00-\u9fa5]*/g;
        // var ipReg = /(http(s)?:\/\/.)?((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/g;
    
    
        str = str.replace(linkReg, function (url, start, s) {
          if (start) {
            var _url = arguments[0].replace(/^(\s|\n|<br\s*\/*>)/, "");
            // _url = _url.replace(pre,'');
            // var whole = _url.indexOf('http://') == 0 ? '' : 'http://';
            var whole = (_url.indexOf('http://') == 0 || _url.indexOf('https://') == 0) ? '' : (s ? 'https://' : 'http://');
            return '<a draggable="false" target="_blank" href="' + whole + _url + '">' + _url + "</a>";
          } else {
            return url;
          }
        })
        return str.replace(ipReg, function (v) {
          var _v = v.replace(metaReg, function (v) {
            return '\\' + v;
          });
          var a = new RegExp('<a.*' + _v + '.*(<\/a>)', '');
          var matches = str.match(a);
          var start = '';
          if (!/http(s)*:\/\//.test(v)) {
            start = 'http://';
          }
          return matches != null ? v : '<a draggable="false" target="_blank" href="' + start + v + '">' + v + "</a>";
        })
      },
    convertAtFromMob(str) {
      var atReg =/@([^@]+)\s\u200B/gi;
      str = str.replace(atReg, function (v, name) {
        return '<a class="msg_at_emp">@' + name + '</a> ';
      })
      return str;
    },
    faceToImg(content) {
        let that = this;
        var reg = /(title=)?(?:'|")?(\[([^\]]+)\])(?:'|")?/gi;
        // 字串替换替换
        content = content.replace(reg, function (v1, v2, v3, v4) {
            if (v2 === undefined) {
                // console.log(content,v1, v2, v3, v4)
                for (var p in that.faces().maps) {
                    if (that.faces().maps[p][v4] !== undefined) {
                        var idx = that.faces().maps[p][v4];
                        idx = idx < 10 ? '0' + idx : idx;
                        // require 引入图片路径 否则vue 编译找不到路径
                        let url = require("../../src/assets/images/qqemoji/e1" + idx + ".png");
                        // console.log(url)
                        return '<img draggable="false" isface="1" src="' + url + '" class="' + p + '_face" title="[' + v4 + ']" />'
                        // return '<img title="['+v4+']" class="'+p+'_face '+p+'_'+faces.maps[p][v4]+'" src="img/spacer.gif">';
                    }
                }
            }
            return v1;
        })
        return content;
    },
    emojiFaceToImg(str) {
        var reg = /(title1=)?(?:'|")?(\[([^\]]+)\])(?:'|")?/gi;
        str = str.replace(reg, function (v1, v2, v3, v4) {
            var reg2 = /^emoji_/;
            if (reg2.test(v4)) {
                v4 = v4.replace(reg2, '');
                if (v2 === undefined && emojiTitleMap[v4] && emojiTitleMap[v4].code) {
                    // require 引入图片路径 否则vue 编译找不到路径
                    let url = require("../../src/assets/images/emoji/" + emojiTitleMap[v4].code.toLowerCase() + ".png");
                    return '<img isface="1" src="' + url + '" title1="[emoji_' + v4 + ']" class="emoji_face">';
                    // return '<img isface="1" src="../../src/assets/images/emoji/' + emojiTitleMap[v4].code.toLowerCase() + '.png" title1="[emoji_' + v4 + ']" class="emoji_face">';
                }
            }
            return v1;
        })
        return str;
    }
};