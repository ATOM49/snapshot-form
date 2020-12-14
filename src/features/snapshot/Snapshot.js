import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSnapshot,
  updateSnapshot,
  clearSnapshot,
  restoreSnapshot
} from './snapshotSlice';
import styles from './Snapshot.module.css';

const withSnapshot = BaseComponent => ({ ...props }) => {
  const snapshot = useSelector(selectSnapshot);
  const dispatch = useDispatch();
  const [snapshotText, setSnapshotText] = useState();
  const [validSnapshot, setValidSnapshot] = useState(false);
  let input = null;

  // Listen to changes in the snapshot Text
  useEffect(() => {
    // Check if the value being entered in the input text is a valid snapshot
    try {
      const parsedSnapshot = JSON.parse(snapshotText);
      setValidSnapshot(
        ['checkbox', 'radio'].every(i =>
          Object.keys(parsedSnapshot).includes(i)
        ) &&
          typeof parsedSnapshot['radio'] === 'string' &&
          parsedSnapshot['checkbox'] instanceof Array
      );
    } catch (e) {
      setValidSnapshot(false);
    }
  }, [snapshotText]);

  const copyTextToClipboard = text => {
    var input = document.body.appendChild(document.createElement('input'));
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
  };

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        ref={ref => (input = ref)}
        placeholder="Paste snapshot to restore..."
        value={snapshotText}
        onChange={e => setSnapshotText(e.target.value)}
      />
      <div className={styles.actions}>
        <button
          onClick={() => {
            copyTextToClipboard(JSON.stringify(snapshot));
            alert('Snapshot copied!');
          }}
        >
          Copy State
        </button>

        <button
          disabled={!validSnapshot} // enable the restore action only if the snapshot is valid
          onClick={() => dispatch(restoreSnapshot(snapshotText))}
        >
          Restore State
        </button>
        <button onClick={() => dispatch(clearSnapshot())}>Clear State</button>
      </div>
      <BaseComponent
        {...props}
        updateSnapshot={updateSnapshot}
        snapshot={snapshot}
      />
    </div>
  );
};

export default withSnapshot;
