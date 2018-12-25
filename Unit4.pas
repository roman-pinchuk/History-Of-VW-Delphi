unit Unit4;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms, 
  Dialogs, OleCtrls, SHDocVw, pngimage, ExtCtrls;

type
  TFrame4 = class(TFrame)
    WebBrowser1: TWebBrowser;
    Image6: TImage;
    Image5: TImage;

  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

uses Unit3, Unit1, Unit2;

{$R *.dfm}


end.
