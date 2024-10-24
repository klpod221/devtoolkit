const MomentFormat = () => {
  return (
    <table class="table-auto w-full border-collapse border border-gray-200 dark:border-dark-secondary">
      <thead className="sticky -top-[1px] bg-gray-100 dark:bg-dark-secondary">
        <tr className="bg-gray-100 dark:bg-dark-secondary border border-gray-200 dark:border-dark-secondary">
          <th className="px-1"></th>
          <th className="px-1">Token</th>
          <th className="px-1">Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Month</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            M
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 11 12
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Mo
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd ... 11th 12th
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            MM
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 11 12
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            MMM
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Jan Feb ... Nov Dec
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            MMMM
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            January February ... November December
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Quarter</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Q
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 3 4
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Qo
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd 3rd 4th
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Day of Month</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            D
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 30 31
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Do
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd ... 30th 31st
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            DD
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 30 31
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Day of Year</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            DDD
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 364 365
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            DDDo
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd ... 364th 365th
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            DDDD
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            001 002 ... 364 365
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Day of Week</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            d
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 5 6
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            do
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0th 1st ... 5th 6th
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            dd
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Su Mo ... Fr Sa
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            ddd
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Sun Mon ... Fri Sat
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            dddd
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Sunday Monday ... Friday Saturday
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Day of Week (Locale)</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            e
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 5 6
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Day of Week (ISO)</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            E
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 6 7
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Week of Year</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            w
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 52 53
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            wo
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd ... 52nd 53rd
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            ww
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 52 53
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Week of Year (ISO)</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            W
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 52 53
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Wo
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1st 2nd ... 52nd 53rd
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            WW
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 52 53
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Year</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            YY
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            70 71 ... 29 30
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            YYYY
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1970 1971 ... 2029 2030
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            YYYYYY
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            -001970 -001971 ... +001907 +001971
            <br />
            <b>Note:</b>{" "}
            <a href="https://tc39.es/ecma262/#sec-expanded-years">
              Expanded Years
            </a>{" "}
            (Covering the full time value range of approximately 273,790 years
            forward or backward from 01 January, 1970)
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Y
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1970 1971 ... 9999 +10000 +10001
            <br />
            <b>Note:</b> This complies with the ISO 8601 standard for dates past
            the year 9999
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Era Year</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            y
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 2020 ...{" "}
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Era</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            N, NN, NNN
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            {" "}
            BC AD
            <br />
            <b>Note:</b> Abbr era name
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            NNNN
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            {" "}
            Before Christ, Anno Domini <br />
            <b>Note:</b> Full era name
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            NNNNN
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            {" "}
            BC AD
            <br />
            <b>Note:</b> Narrow era name
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Week Year</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            gg
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            70 71 ... 29 30
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            gggg
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1970 1971 ... 2029 2030
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Week Year (ISO)</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            GG
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            70 71 ... 29 30
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            GGGG
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1970 1971 ... 2029 2030
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>AM/PM</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            A
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            AM PM
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            a
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            am pm
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Hour</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            H
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 22 23
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            HH
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            00 01 ... 22 23
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            h
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 11 12
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            hh
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 11 12
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            k
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1 2 ... 23 24
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            kk
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            01 02 ... 23 24
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Minute</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            m
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 58 59
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            mm
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            00 01 ... 58 59
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Second</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            s
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 58 59
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            ss
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            00 01 ... 58 59
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Fractional Second</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            S
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            0 1 ... 8 9
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            SS
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            00 01 ... 98 99
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            SSS
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            000 001 ... 998 999
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            SSSS ... SSSSSSSSS
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            000[0..] 001[0..] ... 998[0..] 999[0..]
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Time Zone</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            z or zz
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            EST CST ... MST PST
            <br />
            <b>Note:</b> as of <b>1.6.0</b>, the z/zz format tokens have been
            deprecated from plain moment objects.{" "}
            <a href="https://github.com/moment/moment/issues/162">
              Read more about it here.
            </a>
            However, they *do* work if you are using a specific time zone with
            the moment-timezone addon.
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            Z
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            -07:00 -06:00 ... +06:00 +07:00
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1"></td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            ZZ
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            -0700 -0600 ... +0600 +0700
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Unix Timestamp</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            X
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1360013296
          </td>
        </tr>
        <tr>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            <b>Unix Millisecond Timestamp</b>
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            x
          </td>
          <td className="border border-gray-200 dark:border-dark-secondary px-1">
            1360013296123
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default MomentFormat;
