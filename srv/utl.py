import pandas as pd


def fmt_date(k_data):
    k_data["date"] = pd.to_datetime(k_data["date"])
    k_data.set_index("date", inplace=True)

    return k_data


def to_dict(k_data):
    return k_data.to_dict("records")
