unit Unit13;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, OleCtrls, SHDocVw, jpeg, ExtCtrls, Menus;

type
  TForm13 = class(TForm)
    Image1: TImage;
    WebBrowser1: TWebBrowser;
    MainMenu1: TMainMenu;
    N2345234t61: TMenuItem;
    N1: TMenuItem;
    procedure FormActivate(Sender: TObject);
    procedure N1Click(Sender: TObject);
    procedure N2345234t61Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form13: TForm13;

implementation

uses Unit14, Unit1;

{$R *.dfm}

procedure TForm13.FormActivate(Sender: TObject);
begin
 webbrowser1.Navigate(form1.patch+'htm_files\help.htm');
end;

procedure TForm13.N1Click(Sender: TObject);
begin
 form14.show;
end;

procedure TForm13.N2345234t61Click(Sender: TObject);
begin
 close
end;

end.
